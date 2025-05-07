import Site from "./site.model.js";
import { errorHandler } from "../../utils/error.js";

// دوال المساعدة
const findSiteOrThrow = async (siteId, userId = null) => {
  const query = userId ? { _id: siteId, user: userId } : { _id: siteId };
  const site = await Site.findOne(query);
  if (!site) throw errorHandler(404, "الموقع غير موجود");
  return site;
};

const findSubsiteOrThrow = (site, subsiteId) => {
  const subsite = site.subsites.id(subsiteId);
  if (!subsite) throw errorHandler(404, "الموقع الفرعي غير موجود");
  return subsite;
};

const findEmployeeOrThrow = (subsite, employeeId) => {
  const employee = subsite.employees.id(employeeId);
  if (!employee) throw errorHandler(404, "الموظف غير موجود");
  return employee;
};

// الوظائف الرئيسية

export const createSite = async (req, res, next) => {
  try {
    const site = await Site.create({ name: req.body.name, user: req.user.id });
    res.status(201).json(site);
  } catch (err) {
    next(err);
  }
};

export const getSites = async (req, res, next) => {
  try {
    const sites = await Site.find({ user: req.user.id });
    res.status(200).json(sites);
  } catch (err) {
    next(err);
  }
};

export const getSite = async (req, res, next) => {
  try {
    const site = await findSiteOrThrow(req.params.siteId, req.user.id);
    res.status(200).json(site);
  } catch (err) {
    next(err);
  }
};

export const updateSite = async (req, res, next) => {
  try {
    const site = await Site.findOneAndUpdate(
      { _id: req.params.siteId, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!site) throw errorHandler(404, "الموقع غير موجود");
    res.status(200).json(site);
  } catch (err) {
    next(err);
  }
};

export const deleteSite = async (req, res, next) => {
  try {
    const site = await Site.findOneAndDelete({
      _id: req.params.siteId,
      user: req.user.id,
    });
    if (!site) throw errorHandler(404, "الموقع غير موجود");
    res.status(200).json({ message: "تم حذف الموقع بنجاح" });
  } catch (err) {
    next(err);
  }
};

export const addSubsite = async (req, res, next) => {
  try {
    const site = await findSiteOrThrow(req.params.siteId);
    site.subsites.push({ name: req.body.name });
    await site.save();
    res.status(201).json(site);
  } catch (err) {
    next(err);
  }
};

export const addEmployee = async (req, res, next) => {
  try {
    const site = await findSiteOrThrow(req.params.siteId);
    const subsite = findSubsiteOrThrow(site, req.params.subsiteId);
    subsite.employees.push({ name: req.body.employeeName });
    await site.save();
    res.status(201).json(site);
  } catch (err) {
    next(err);
  }
};

export const addEmployeeTask = async (req, res, next) => {
  try {
    const site = await findSiteOrThrow(req.params.siteId);
    const subsite = findSubsiteOrThrow(site, req.params.subsiteId);
    const employee = findEmployeeOrThrow(subsite, req.params.employeeId);
    employee.tasks.push(req.body.task);
    await site.save();
    res.status(201).json(site);
  } catch (err) {
    next(err);
  }
};

export const addDeadline = async (req, res, next) => {
  try {
    const site = await findSiteOrThrow(req.params.siteId);
    const subsite = findSubsiteOrThrow(site, req.params.subsiteId);
    subsite.deadlines.push({ date: req.body.date, report: req.body.report });
    await site.save();
    res.status(201).json(site);
  } catch (err) {
    next(err);
  }
};
