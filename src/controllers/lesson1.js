const emilyRoute = (req, res) => {
    res.send('Hello Emily');
};

const hannaRoute = (req, res) => {
    res.send('Hello Hannah');
};

module.exports = { emilyRoute, hannaRoute}
