import Agent from "../models/agent.model.js";

export const getAgentService = async () => {

}

export const createAgentService = async (agentData) => {
    const { name } = agentData

    const agentExists = await Agent.findOne({ name: name.toLowerCase() })
    if(agentExists) throw new Error ({ msg: `El agente ${name} ya existe` })

    const agent = new Agent(agentData)
    await agent.save()
    return agent
}