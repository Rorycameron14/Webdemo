const router = require('express').Router();
const upload = require('../middleware/upload');
const { validateEnquiry } = require('../middleware/validation');
const { requireAuth } = require('../middleware/auth');
const {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} = require('../controllers/enquiryController');

// Public — submit enquiry form
router.post('/', upload.single('file'), validateEnquiry, createEnquiry);

// Admin protected
router.get('/', requireAuth, getEnquiries);
router.get('/:id', requireAuth, getEnquiryById);
router.put('/:id', requireAuth, updateEnquiry);
router.delete('/:id', requireAuth, deleteEnquiry);

module.exports = router;
