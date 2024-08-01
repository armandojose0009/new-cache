const redis = require('../config/redis');
const Record = require('../models/Record');

const getAllRecords = async (req, res) => {
  const cacheKey = 'all_records';
  const cachedRecords = await redis.get(cacheKey);

  if (cachedRecords) {
    return res.json(JSON.parse(cachedRecords));
  }

  const records = await Record.find();
  await redis.set(cacheKey, JSON.stringify(records), 'EX', 3600);
  res.json(records);
};

const getRecordById = async (req, res) => {
  const { id } = req.params;

  const cachedRecord = await redis.get(`record:${id}`);
  if (cachedRecord) {
    return res.json(JSON.parse(cachedRecord));
  }

  const record = await Record.findById(id);
  if (!record) {
    return res.status(404).json({ message: 'Registro no encontrado' });
  }

  await redis.set(`record:${id}`, JSON.stringify(record), 'EX', 3600);
  res.json(record);
};

const createRecord = async (req, res) => {
  const { name, value } = req.body;

  const newRecord = new Record({ name, value });
  await newRecord.save();

  await redis.del('all_records');

  await redis.set(`record:${newRecord._id}`, JSON.stringify(newRecord), 'EX', 3600);

  res.status(201).json(newRecord);
};

const updateRecord = async (req, res) => {
  const { id } = req.params;
  const { name, value } = req.body;

  const record = await Record.findByIdAndUpdate(id, { name, value }, { new: true });
  if (!record) {
    return res.status(404).json({ message: 'Registro no encontrado' });
  }

  await redis.del('all_records');

  await redis.set(`record:${record._id}`, JSON.stringify(record), 'EX', 3600);

  res.json(record);
};

const deleteRecord = async (req, res) => {
  const { id } = req.params;

  const record = await Record.findByIdAndDelete(id);
  if (!record) {
    return res.status(404).json({ message: 'Registro no encontrado' });
  }

  await redis.del('all_records');

  await redis.del(`record:${id}`);

  res.sendStatus(204);
};

module.exports = {
    getAllRecords,
    getRecordById,
    createRecord,
    updateRecord,
    deleteRecord,
};
