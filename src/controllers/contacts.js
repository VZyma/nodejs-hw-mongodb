import createHttpError from 'http-errors';
import * as contactServices from '../services/contacts.js';

export const getAllContactsController = async (req, res, next) => {
  try {
    const data = await contactServices.getAllContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await contactServices.getContactById(contactId);

    if (!data) {
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: `Contact with id = ${contactId} successfully found`,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const createContactsController = async (req, res, next) => {
  try {
    const data = await contactServices.createContacts(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await contactServices.updateContact(
      { _id: contactId },
      req.body,
    );

    if (!data) {
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await contactServices.deleteContact({ _id: contactId });

    if (!data) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};