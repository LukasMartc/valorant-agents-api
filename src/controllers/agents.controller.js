import fs from 'node:fs/promises'
import colors from 'colors'
import { createAgentService, getAllAgentsService, 
  getAgentService } from '../services/agents.service.js'

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

export class AgentsController {
  static updateAgent = async (req, res) => {
    const { name } = req.params
    const agentsPath = `${process.cwd()}/src/data/agents.json`

    try {
      const data = await fs.readFile(agentsPath, { encoding: 'utf-8' })
      const agents = JSON.parse(data)

      const index = agents.findIndex(a => a.name === name.toLowerCase())

      if(index === -1) {
        return res.status(404).json({ msg: 'El agente no existe' })
      }

      agents[index] = {
        ...agents[index],
        ...req.body
      }

      await fs.writeFile(agentsPath, JSON.stringify(agents, null, 2))
      return res.status(200).json({ msg: 'Agente actualizado', agent: agents[index] })
    } catch (err) {
      console.log(colors.red(err))
      return res.status(500).json({ error: 'Error al actualizar el agente' })
    }
  }

  static deleteAgent = async (req, res) => {
    const { name } = req.params
    const agentsPath = `${process.cwd()}/src/data/agents.json`

    try {
      const data = await fs.readFile(agentsPath, { encoding: 'utf-8' })
      const agents = JSON.parse(data)

      const index = agents.findIndex(a => a.name === name.toLowerCase())

      if(index === -1) {
        return res.status(404).json({ msg: 'El agente no existe' })
      }

      agents.splice(index, 1)

      await fs.writeFile(agentsPath, JSON.stringify(agents, null, 2))
      return res.status(200).json({ msg: 'Agente eliminado correctamente' })
    } catch (err) {
      console.log(colors.red(err))
      return res.status(500).json({ error: 'Error al eliminar el agente' })
    }
  }
}
