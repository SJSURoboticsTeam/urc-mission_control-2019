let graphData = null;

const setData = (obj) => {
    graphData = obj;
};

const getData = () => {
    return graphData;
};

module.exports = {
    setData, getData
};