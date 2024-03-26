const express = require('express');
const router = express.Router();
const Connection = require('../db/connection');

router.get(`/`, async (req, res) => {
  try {
    const query = `SELECT *` + `FROM ` + `vendor_classes`;

    const results = await Connection(query);

    res.json(results);
  } catch (err) {
    res.send('Error');
  }
});

router.post(`/`, async (req, res) => {
  try {
    const { vendor_type_code, vendor_class_code, vendor_class_description } =
      req.body;
    const query =
      " INSERT INTO `vendor_classes`(`id`, `vendor_type_code`,`vendor_class_code`, `vendor_class_description`, `deleted_at`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES ('','" +
      vendor_type_code +
      "','" +
      vendor_class_code +
      "','" +
      vendor_class_description +
      "','','kevin','','','')";

    await Connection(query);

    res.status(200).send({
      message: 'Successfully Created!',
    });
  } catch (err) {
    res.status(500).send({
      message: 'Not Created!',
    });
  }
});

router.delete(`/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const query = `DELETE FROM ` + `vendor_classes ` + ` WHERE id = '${id}'`;

    await Connection(query);

    res.status(200).send({
      message: 'Successfully Deleted!',
    });
  } catch (err) {
    res.status(500).send({
      message: 'Not Deleted!',
    });
  }
});

router.put(`/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const { vendor_type_code, vendor_class_code, vendor_class_description } =
      req.body;

    const query =
      `UPDATE ` +
      `vendor_classes ` +
      `SET ` +
      `vendor_type_code = '${vendor_type_code}', ` +
      `vendor_class_code = '${vendor_class_code}', ` +
      `vendor_class_description = '${vendor_class_description}' ` +
      `WHERE ` +
      `id = ${id}`;

    await Connection(query);

    res.status(200).send({
      message: 'Successfully Updated!',
    });
  } catch (err) {
    res.status(500).send({
      message: 'Not Updated!',
    });
  }
});

module.exports = router;
