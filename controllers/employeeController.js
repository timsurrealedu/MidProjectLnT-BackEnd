const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const Database = require('better-sqlite3');

const dbPath = process.env.DATABASE_URL ? process.env.DATABASE_URL.replace('file:', '') : './dev.db';
const db = new Database(dbPath);
const adapter = new PrismaBetterSqlite3(db);
const prisma = new PrismaClient({ adapter });

// Get all employees
const getAllEmployees = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany();
        res.render('index', { employees });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving employees");
    }
};

// Render Add Employee page
const renderAddEmployee = (req, res) => {
    res.render('add', { error: null, employee: {} });
};

// Create new employee
const createEmployee = async (req, res) => {
    const { name, age, address, phoneNumber } = req.body;
    let errors = [];

    // Validation
    if (!name || name.length < 5 || name.length > 20) {
        errors.push("Nama karyawan harus antara 5 dan 20 karakter.");
    }
    const ageNum = parseInt(age);
    if (!age || isNaN(ageNum) || ageNum <= 20) {
        errors.push("Umur karyawan harus lebih besar dari 20 tahun.");
    }
    if (!address || address.length < 10 || address.length > 40) {
        errors.push("Alamat karyawan harus antara 10 dan 40 karakter.");
    }
    if (!phoneNumber || !phoneNumber.startsWith('08') || phoneNumber.length < 9 || phoneNumber.length > 12) {
        errors.push("Nomor telp. karyawan harus dimulai dari '08' dan panjang 9-12 karakter.");
    }

    if (errors.length > 0) {
        return res.render('add', { error: errors.join('<br>'), employee: req.body });
    }

    try {
        await prisma.employee.create({
            data: {
                name,
                age: ageNum,
                address,
                phoneNumber
            }
        });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.render('add', { error: "Gagal menambahkan karyawan.", employee: req.body });
    }
};

// Render Edit Employee page
const renderEditEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await prisma.employee.findUnique({
            where: { id: parseInt(id) }
        });
        if (!employee) {
            return res.redirect('/');
        }
        res.render('edit', { error: null, employee });
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
};

// Update employee
const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, age, address, phoneNumber } = req.body;
    let errors = [];

    // Validation (same as create)
    if (!name || name.length < 5 || name.length > 20) {
        errors.push("Nama karyawan harus antara 5 dan 20 karakter.");
    }
    const ageNum = parseInt(age);
    if (!age || isNaN(ageNum) || ageNum <= 20) {
        errors.push("Umur karyawan harus lebih besar dari 20 tahun.");
    }
    if (!address || address.length < 10 || address.length > 40) {
        errors.push("Alamat karyawan harus antara 10 dan 40 karakter.");
    }
    if (!phoneNumber || !phoneNumber.startsWith('08') || phoneNumber.length < 9 || phoneNumber.length > 12) {
        errors.push("Nomor telp. karyawan harus dimulai dari '08' dan panjang 9-12 karakter.");
    }

    if (errors.length > 0) {
        // Reuse create validation logic, simplified for clarity
        // Note: For update, we render 'edit' not 'add'
        // Need to fetch original employee if validation fails so form has correct ID action, 
        // but wait, form action is /edit/:id, so template needs 'employee' object with id.
        // We pass req.body + id.
        const employeeData = { ...req.body, id: parseInt(id) }; // Ensure ID is passed back
        return res.render('edit', { error: errors.join('<br>'), employee: employeeData });
    }

    try {
        await prisma.employee.update({
            where: { id: parseInt(id) },
            data: {
                name,
                age: ageNum,
                address,
                phoneNumber
            }
        });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        const employeeData = { ...req.body, id: parseInt(id) };
        res.render('edit', { error: "Gagal memperbarui karyawan.", employee: employeeData });
    }
};

// Delete employee
const deleteEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.employee.delete({
            where: { id: parseInt(id) }
        });
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.redirect('/'); // Or show error
    }
};

module.exports = {
    getAllEmployees,
    renderAddEmployee,
    createEmployee,
    renderEditEmployee,
    updateEmployee,
    deleteEmployee
};
