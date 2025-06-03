import Agent from "../models/agent.model.js";

export const createAgentService = async (agentData) => {
  const { name } = agentData

  const agentExists = await Agent.findOne({ name: name.toLowerCase() })
  if(agentExists) {
    const error = new Error(`El agente ${name} ya existe`)
    error.status = 409
    throw error 
  }    

  const agent = new Agent(agentData)
  await agent.save()
  return agent
}

export const getAllAgentsService = async (agentFilters) => {
  const { search, role } = agentFilters

  const filter = {}

  if (search) {
    filter.name = { $regex: search, $options: 'i' }
  }

  if (role) {
    filter.role = role.toLowerCase()
  }

  const agents = await Agent.find(filter)

  if(agents.length === 0) {
    const error = new Error('No se encontraron agentes con los filtros proporcionados')
    error.status
    throw error
  }

  return agents
}

export const getAgentService = async (nameAgent) => {
  const { name } = nameAgent

  const agentFound = await Agent.findOne({ name: name.toLowerCase() })
  if (!agentFound) {
    const error = new Error('El agente no existe')
    error.status = 404
    throw error
  }

  return agentFound
}

export const deleteAgentService = async (nameAgent) => {
  const { name } = nameAgent
 
  const agentExists = await Agent.findOne({ name: name.toLowerCase() })
  if (!agentExists) {
    const error = new Error('El agente no existe')
    error.status = 404
    throw error
  }

  await Agent.deleteOne({ name: name.toLowerCase() })
}

export const updateAgentService = async (nameAgent, newData) => {
  const { name } = nameAgent

  const agentExists = await Agent.findOne({ name: name.toLowerCase() })
  if (!agentExists) {
    const error = new Error('El agente no existe')
    error.status = 404
    throw error
  }

  const agentUpdated = await Agent.findOneAndUpdate({ name: name.toLowerCase() }, newData, {
    new: true
  })
  return agentUpdated
}