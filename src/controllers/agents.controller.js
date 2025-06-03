import fs from 'node:fs/promises'
import colors from 'colors'
import { createAgentService, getAllAgentsService, 
  getAgentService, deleteAgentService, updateAgentService} from '../services/agents.service.js'

export const createAgent = async (req, res) => {
  try {
    const newAgent = await createAgentService(req.body)
    return res.status(201).json({
      msg: `Agente ${newAgent.name} creado correctamente`,
      agent: newAgent
    })
  } catch (error) {
    console.log(colors.red(error))
    const message = error.errors
      ? // Si existen errores de validación de Mongoose (error.errors):
        [...new Set( // Elimina mensajes duplicados usando Set()
          Object.values(error.errors) // Convierte los objetos de error en un array de valores
            .map(err => err.message) // Extrae solo el 'message' de cada error
        )].join(', ') // Convierte el array en un string separado por comas
      : error.message // Si no hay errores específicos (error.errors no existe), usa el mensaje general:
    return res.status(error.status || 500).json({ error: message })
  }
}

export const getAllAgents = async (req, res) => {
  try {
    const agents = await getAllAgentsService(req.query)
    return res.status(200).json(agents)
  } catch (error) {
    console.log(colors.red(error))
    const message = error.errors
      ? Object.values(error.errors).map(err => err.message).join(', ')
      : error.message
    return res.status(error.status || 500).json({ error: message })
  }
}

export const getAgent = async (req, res) => {
  try {
    const agent = await getAgentService(req.params)
    return res.status(200).json(agent)
  } catch (error) {
    console.log(colors.red(error))
    const message = error.errors
      ? Object.values(error.errors).map(err => err.message).join(', ')
      : error.message
    return res.status(error.status || 500).json({ error: message })
  }
}

export const deleteAgent = async (req, res) => {
  try {
    await deleteAgentService(req.params)
    return res.status(200).json({ msg: 'Agente eliminado correctamente' })
  } catch (error) {
    console.log(colors.red(error))
    const message = error.errors
      ? Object.values(error.errors).map(err => err.message).join(', ')
      : error.message
    return res.status(error.status || 500).json({ error: message })
  }
}

export const updateAgent = async (req, res) => {
  try {
    const agentUpdated = await updateAgentService(req.params, req.body)
    return res.status(200).json({ msg: 'Agente actualizado', agent: agentUpdated })
  } catch (error) {
    console.log(colors.red(error))
    const message = error.errors
      ? Object.values(error.errors).map(err => err.message).join(', ')
      : error.message
    return res.status(error.status || 500).json({ error: message })
  }
}
