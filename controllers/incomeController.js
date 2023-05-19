const { Income } = require('../models');

// CREATE
exports.createIncome = async (req, res) => {
    const { minIncome, maxIncome } = req.body;

    // Delete all previous income ranges
    await Income.deleteMany({});

    const ranges = [];

    // Calculate income ranges
    for (let i = minIncome; i < maxIncome; i += 2) {
        const range = `${i}-${i + 2}`;
        ranges.push(range);
    }

    // Add last income range (maxIncome+)
    ranges.push(`${maxIncome}+`);

    // Create new income range
    Income.create({
        minIncome,
        maxIncome,
        ranges,
    })
        .then((income) => {
            res.status(201).send(income);
        })
        .catch((err) => {
            res.status(400).send({ message: 'Error creating income range', error: err });
        });
};


// READ
exports.getIncome = (req, res) => {
    Income.find()
        .then((income) => {
            const response = {
                data: income,
              };
            res.status(200).send(response);
        })
        .catch((err) => {
            res.status(400).send({ message: 'Error getting income ranges' });
        });
};


// UPDATE
exports.updateIncome = (req, res) => {
    const { minIncome, maxIncome } = req.body;

    Income.findByIdAndUpdate(
        req.params.id,
        {
            minIncome,
            maxIncome,
        },
        { new: true },
        (err, income) => {
            if (err) {
                res.status(400).send({ message: 'Error updating income range' });
            } else {
                res.status(200).send(income);
            }
        }
    );
};

// DELETE
exports.deleteIncome = (req, res) => {
    Income.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            res.status(400).send({ message: 'Error deleting income range' });
        } else {
            res.status(204).send();
        }
    });
};
