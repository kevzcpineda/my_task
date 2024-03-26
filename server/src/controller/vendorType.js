const express = require('express');
const router = express.Router();
const Connection = require('../db/connection');

router.get(`/`, async (req, res) => {
  try {
    const query = `SELECT *` + `FROM ` + `vendor_types`;

    const results = await Connection(query);

    res.json(results);
  } catch (err) {
    res.send('Error');
  }
});

router.post(`/`, async (req, res) => {
  try {
    const { vendor_type_code, vendor_type_description } = req.body;
    const query =
      " INSERT INTO `vendor_types`(`id`, `vendor_type_code`, `vendor_type_description`, `deleted_at`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES ('','" +
      vendor_type_code +
      "','" +
      vendor_type_description +
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
    const query = `DELETE FROM ` + `vendor_types ` + ` WHERE id = '${id}'`;

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
    const { vendor_type_code, vendor_type_description } = req.body;

    const query =
      `UPDATE ` +
      `vendor_types ` +
      `SET ` +
      `vendor_type_code = '${vendor_type_code}', ` +
      `vendor_type_description = '${vendor_type_description}' ` +
      `WHERE ` +
      `id = ${id}`;

    const results = await Connection(query);

    res.status(200).send({
      status: results,
      message: 'Successfully Updated!',
    });
  } catch (err) {
    res.status(500).send({
      status: results,
      message: 'Not Updated!',
    });
  }
});

module.exports = router;
