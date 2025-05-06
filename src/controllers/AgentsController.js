import fs from 'node:fs/promises'
import colors from 'colors'

export class AgentsController {
  static getAgent = async (req, res) => {
    try {
      const currentPath = process.cwd()
      const data = await fs.readFile(`${currentPath}/src/data/agents.json`, { encoding: 'utf-8' })
      const agents = JSON.parse(data)
      return res.status(200).json(agents)
    } catch (err) {
      console.log(colors.red(err))
      return res.status(500).json({ error: 'Error al obtener agentes' })
    }
  }

  static createAgent = async (req, res) => {
    const agentsPath = `${process.cwd()}/src/data/agents.json`
    const data = await fs.readFile(agentsPath, { encoding: 'utf-8' })
    const agents = JSON.parse(data)

    const { name } = req.body
    const agentExists = agents.some(agent => agent.name === name)

    if(agentExists) {
      return res.status(409).json({ msg: `El agente ${name} ya existe` })
    }

    try {
      agents.push(req.body)
      await fs.writeFile(agentsPath, JSON.stringify(agents, null, 2))
      return res.status(201).json(`Agente ${name} creado correctamente`)
    } catch (err) {
      console.log(colors.red(err))
      return res.status(500).json({ error: 'Hubo un error al crear el agente' })
    }
  }
}
