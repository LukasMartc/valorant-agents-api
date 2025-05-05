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
      console.log(colors.bgRed(err))
      return res.status(500).json({ error: 'Error al obtener agentes' })
    }
  }
}
