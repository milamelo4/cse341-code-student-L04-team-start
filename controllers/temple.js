const db = require('../models');
const Temple = db.temples;

const apiKey = process.env.API_KEY;


exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.location) {
    res.status(400).send({ message: "Content can not be empty! Name and location are required" });
    return;
  }

  // Create a Temple
  const temple = new Temple({
    temple_id: req.body.temple_id,
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
  });
  // Save Temple in the database
  temple
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.code === 11000) {
        // Corrected the error object name
        res.status(400).send({
          message: "Temple ID already exists. Please use a unique temple_id.",
        });
      } else {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Temple.",
        });
      }
    });
};

exports.findAll = (req, res) => {

  console.log("Received API Key:", req.header("apiKey"));
  if (req.header("apiKey") === apiKey) {
    Temple.find(
      {},
      {
        temple_id: 1,
        name: 1,
        location: 1,
        dedicated: 1,
        additionalInfo: 1,
        _id: 0,
      }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving temples.",
        });
      });
  } else {
    res.send("Invalid apiKey, please read the documentation.");
  }
};


// Find a single Temple with an id
exports.findOne = (req, res) => {
  const temple_id = req.params.temple_id;
  if (req.header('apiKey') === apiKey) {
    Temple.find({ temple_id: temple_id })
      .then((data) => {
        if (!data)
          res
            .status(404)
            .send({ message: 'Not found Temple with id ' + temple_id });
        else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving Temple with temple_id=' + temple_id,
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

// Update a Temple by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty!',
    });
  }

  const id = req.params.id;

  Temple.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Temple with id=${id}. Maybe Temple was not found!`,
        });
      } else res.send({ message: 'Temple was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Temple with id=' + id,
      });
    });
};

// Delete a Temple with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
   console.log("Received temple ID:", req.params.id); 

  Temple.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Temple with id=${id}. Maybe Temple was not found!`,
        });
      } else {
        res.send({
          message: "Temple was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Temple with id=" + id,
      });
    });
};

// Delete all Temples from the database.
exports.deleteAll = (req, res) => {
  Temple.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Temples were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all temple.',
      });
    });
};

// Find all published Temples
exports.findAllPublished = async (req, res) => {
  //console.log("✅ DEBUG: findAllPublished function was called!");
  try {
    // Filter for published temples with a valid dedicated field
    const publishedTemples = await Temple.find({
      
      dedicated: { $nin: ["Announced", "Construction"] }, // Exclude these values
    });

    res.status(200).json({
      message: "Successfully retrieved published temples",
      data: publishedTemples,
    });
  } catch (error) {
    //console.error("❌ DEBUG: Error fetching published temples", error);
    res.status(500).json({
      message: "Error retrieving published temples",
      error: error.message,
    });
  }
};






