const express = require('express');
const router = express.Router();
const Connection = require('../db/connection');

router.get(`/`, async (req, res) => {
  try {
    const query = `SELECT *` + `FROM ` + `vendors`;

    const results = await Connection(query);

    res.json(results);
  } catch (err) {
    res.send('Error');
  }
});

router.post(`/`, async (req, res) => {
  try {
    const {
      vendor_class_code,
      vendor_type_code,
      vendor_code,
      vendor_name,
      email_address,
      payment_terms,
      address_1,
      address_2,
      zip_code,
      region,
      area,
      tax_class,
      ewt_code,
      tin_number,
    } = req.body;
    const query =
      " INSERT INTO `vendors`(`id`, `vendor_class_code`, `vendor_type_code`, `vendor_code`, `vendor_name`, `email_address`, `payment_terms`, `address_1`, `address_2`, `zip_code`, `region`, `area`, `tax_class`, `ewt_code`, `tin_number`, `deleted_at`, `created_by`, `updated_by`, `created_at`, `updated_at`) VALUES ('','" +
      vendor_class_code +
      "','" +
      vendor_type_code +
      "','" +
      vendor_code +
      "','" +
      vendor_name +
      "','" +
      email_address +
      "','" +
      payment_terms +
      "','" +
      address_1 +
      "','" +
      address_2 +
      "','" +
      zip_code +
      "','" +
      region +
      "','" +
      area +
      "','" +
      tax_class +
      "','" +
      ewt_code +
      "','" +
      tin_number +
      "','','','','','')";

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
    const query = `DELETE FROM ` + `vendors ` + ` WHERE id = '${id}'`;

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
    const {
      vendor_class_code,
      vendor_type_code,
      vendor_name,
      vendor_code,
      email_address,
      payment_terms,
      address_1,
      address_2,
      zip_code,
      region,
      area,
      tax_class,
      ewt_code,
      tin_number,
    } = req.body;

    const query =
      `UPDATE ` +
      `vendors ` +
      `SET ` +
      `vendor_class_code = '${vendor_class_code}', ` +
      `vendor_type_code = '${vendor_type_code}' ,` +
      `vendor_code = '${vendor_code}' ,` +
      `email_address = '${email_address}' ,` +
      `payment_terms = '${payment_terms}' ,` +
      `address_1 = '${address_1}' ,` +
      `address_2 = '${address_2}' ,` +
      `zip_code = '${zip_code}' ,` +
      `region = '${region}' ,` +
      `area = '${area}' ,` +
      `tax_class = '${tax_class}' ,` +
      `ewt_code = '${ewt_code}' ,` +
      `tin_number = '${tin_number}' ,` +
      `vendor_name = '${vendor_name}' ` +
      `WHERE ` +
      `id = ${id}`;

    const results = await Connection(query);

    res.status(200).send({
      status: results,
      message: 'Successfully Updated!',
    });
  } catch (err) {
    res.status(500).send({
      message: 'Not Updated!',
    });
  }
});

module.exports = router;
