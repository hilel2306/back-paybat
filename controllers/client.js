import { createClient, getClientById, getAllClients, updateClient } from "../models/client.js";

export const clientRegistration = async (req, res) => {
    const { name, firstname, phone, company_id } = req.body;
    try {
        const client = await createClient(name, firstname, phone, company_id)
        return res.status(201).json(client)
    } catch (error) {
        console.error(error.message)
    }
}


export const getClient = async (req, res) => {
    const { id } = req.params;
    try {
        const client = await getClientById(id)
        return res.status(201).json(client)
    } catch (error) {
        console.error(error.message)
    }
}

export const getClients = async (req, res) => {
    const { company_id } = req.query
    try {
        const clients = await getAllClients(company_id)
        return res.status(201).json(clients)
    } catch (error) {
        console.error(message)
    }
}

export const saveClient = async (req, res) => {
    try {
        const client = await updateClient(req.body)
        return res.status(201).json(client)
    } catch (error) {
        console.error(error.message)
    }
}