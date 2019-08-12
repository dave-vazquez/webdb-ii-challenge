const express = require('express');
const db = require('../../data/dg-config');

const router = express.Router();

/********************************************************
 *                     GET api/cars/                    *
 ********************************************************/
router.get('/', async (req, res, next) => {
  try {
    const cars = await db('cars');
    res.status(200).json({
      success: true,
      cars
    });
  } catch (err) {
    next(err);
  }
});

/********************************************************
 *                   GET api/cars/:vin                  *
 ********************************************************/
router.get('/:vin', validateVIN, async (req, res) => {
  res.status(200).json({
    success: true,
    car: req.car
  });
});

/********************************************************
 *                   POST api/cars/:vin                 *
 ********************************************************/
router.post('/', validateRequestBody, async (req, res, next) => {
  try {
    const cars = await db('cars').insert(req.car);
    res.status(200).json({
      success: true,
      cars
    });
  } catch (err) {
    next(err);
  }
});

/********************************************************
 *                  UPDATE api/cars/:vin                *
 ********************************************************/
router.put('/:vin', validateVIN, validateRequestBody, async (req, res, next) => {
  const { vin } = req.params;
  const car = req.car;
  try {
    const cars = await db('cars')
      .where({ vin })
      .update(car);

    res.status(200).json({
      success: true,
      cars
    });
  } catch (err) {
    next(err);
  }
});

/********************************************************
 *                  DELETE api/cars/:vin                *
 ********************************************************/
router.delete('/:vin', validateVIN, async (req, res, next) => {
  const { vin } = req.params;

  try {
    const cars = await db('cars')
      .where({ vin })
      .del();

    res.status(200).json({
      success: true,
      cars
    });
  } catch (err) {
    next(err);
  }
});

/********************************************************
 *                    CUSTOM MIDDLEWARE                 *
 ********************************************************/
async function validateVIN(req, res, next) {
  const { vin } = req.params;

  try {
    const [car] = await db('cars').where({ vin });

    if (car) {
      req.car = car;
      next();
    } else {
      res.status(404).json({
        success: false,
        error: `A car with VIN#: ${vin} could not be found.`
      });
    }
  } catch (err) {
    next(err);
  }
}
/********************************************************
 *                    CUSTOM MIDDLEWARE                 *
 ********************************************************/
async function validateRequestBody(req, res, next) {
  const methodIsPOST = req.method === 'POST';
  const car = req.body;

  if (
    (methodIsPOST && !car.VIN) ||
    !car.year ||
    !car.make ||
    !car.model ||
    !car.mileage.toString()
  ) {
    res.status(400).json({
      success: false,
      error: `The request body must include key-value pairs for${
        methodIsPost ? ` 'VIN', ` : ``
      } 'year', make', 'model' and 'mileage'`
    });
  } else {
    req.car = car;
    next();
  }
}

module.exports = router;
