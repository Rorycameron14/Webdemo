const { db } = require('../config/database');
const { sendClientConfirmation, sendAdminNotification } = require('../services/emailService');
const path = require('path');
const fs = require('fs');

const STATUSES = ['new', 'contacted', 'proposal_sent', 'won', 'lost'];

const createEnquiry = async (req, res, next) => {
  try {
    const { first_name, last_name, email, phone, company, project_type, budget, project_description } = req.body;
    const file_path = req.file ? `/uploads/${req.file.filename}` : null;
    const original_filename = req.file ? req.file.originalname : null;

    const info = db.prepare(`
      INSERT INTO enquiries
        (first_name, last_name, email, phone, company, project_type, budget, project_description, file_path, original_filename)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(first_name, last_name, email, phone, company, project_type, budget, project_description, file_path, original_filename);

    const enquiry = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(info.lastInsertRowid);

    try {
      await Promise.all([sendClientConfirmation(enquiry), sendAdminNotification(enquiry)]);
      console.log('Emails sent successfully for enquiry', enquiry.id);
    } catch (emailErr) {
      console.error('Email sending failed:', emailErr.message, emailErr.code, emailErr.response);
    }

    res.status(201).json({ success: true, data: enquiry });
  } catch (err) {
    next(err);
  }
};

const getEnquiries = async (req, res, next) => {
  try {
    const { search = '', status = '', sort = 'created_at', order = 'desc', page = 1, limit = 20 } = req.query;

    const allowedSort = ['created_at', 'first_name', 'company', 'budget', 'status'];
    const sortCol = allowedSort.includes(sort) ? sort : 'created_at';
    const sortDir = order === 'asc' ? 'ASC' : 'DESC';
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const conditions = [];
    const params = [];

    if (search) {
      params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
      conditions.push(`(first_name LIKE ? OR last_name LIKE ? OR email LIKE ? OR company LIKE ?)`);
    }
    if (status && STATUSES.includes(status)) {
      params.push(status);
      conditions.push(`status = ?`);
    }

    const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

    const total = db.prepare(`SELECT COUNT(*) as count FROM enquiries ${where}`).get(...params).count;
    const rows = db.prepare(
      `SELECT * FROM enquiries ${where} ORDER BY ${sortCol} ${sortDir} LIMIT ? OFFSET ?`
    ).all(...params, parseInt(limit), offset);

    res.json({
      data: rows,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (err) {
    next(err);
  }
};

const getEnquiryById = async (req, res, next) => {
  try {
    const enquiry = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(req.params.id);
    if (!enquiry) return res.status(404).json({ error: 'Enquiry not found' });
    res.json({ data: enquiry });
  } catch (err) {
    next(err);
  }
};

const updateEnquiry = async (req, res, next) => {
  try {
    const { status, internal_notes } = req.body;

    if (status && !STATUSES.includes(status)) {
      return res.status(422).json({ error: `Invalid status. Must be one of: ${STATUSES.join(', ')}` });
    }

    const existing = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Enquiry not found' });

    db.prepare(`
      UPDATE enquiries
      SET status = COALESCE(?, status),
          internal_notes = COALESCE(?, internal_notes)
      WHERE id = ?
    `).run(status ?? null, internal_notes ?? null, req.params.id);

    const updated = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(req.params.id);
    res.json({ data: updated });
  } catch (err) {
    next(err);
  }
};

const deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(req.params.id);
    if (!enquiry) return res.status(404).json({ error: 'Enquiry not found' });

    if (enquiry.file_path) {
      const abs = path.join(__dirname, '../../../', enquiry.file_path);
      if (fs.existsSync(abs)) fs.unlinkSync(abs);
    }

    db.prepare('DELETE FROM enquiries WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = { createEnquiry, getEnquiries, getEnquiryById, updateEnquiry, deleteEnquiry };
