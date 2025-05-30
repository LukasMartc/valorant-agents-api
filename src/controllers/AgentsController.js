import fs from 'node:fs/promises'
import colors from 'colors'
import { createAgentService } from '../services/agents.service.js'

export const createAgent = async (req, res) => {
  try {
    const newAgent = await createAgentService(req.body)
    return res.status(201).json({
      msg: `Agente ${newAgent.name} creado correctamente`,
      agent: newAgent
    })
  } catch (error) {
    console.log(colors.red(error))
    return res.status(409).json({ error: error.message })
  }
}

export class AgentsController {
  static getAgents = async (req, res) => {
    const agentsPath = `${process.cwd()}/src/data/agents.json`

    try {
      const data = await fs.readFile(agentsPath, { encoding: 'utf-8' })
      const agents = JSON.parse(data)
      return res.status(200).json(agents)
    } catch (err) {
      console.log(colors.red(err))
      return res.status(500).json({ error: 'Error al obtener agentes' })
    }
  }

  static getAgent = async (req, res) => {
    const { name } = req.params
    const agentsPath = `${process.cwd()}/src/data/agents.json`

    try {
      const data = await fs.readFile(agentsPath, { encoding: 'utf-8' })
      const agents = JSON.parse(data)

      const agent = agents.find(a => a.name === name.toLowerCase())
      
      if(!agent) {
        return res.status(404).json({ msg: 'El agente no existe' })
      }

      return res.status(200).json(agent)
    } catch (err) {
      console.log(colors.red(err))
      return res.status(500).json({ error: 'Error al obtener el agente' })
    }
  }

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
