import mongoose, { Schema } from "mongoose";

const agentSchema = new Schema({
  name: { 
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxLength: 300
  },
  role: {
    type: String,
    required: true,
    trim: true,
    enum: ['duelista', 'controlador', 'iniciador', 'centinela']
  },
  skills: {
    type: [
      {
        name: { type: String, required: true, trim: true },
        type: { type: String, required: true, trim: true, enum: ['básica', 'firma', 'definitiva'] },
        description: { type: String, required: true, trim: true, maxLength: 500 },
        cost: {
          type: Number, required: true, default: 0, min: 0,
          validate: {
            validator: function(value) {
              if (this.type === 'básica') return value > 0
              return value === 0
            },
            message: 'Las habilidades "firma" y "definitiva" deben costar 0'
          }
        }
      }
    ],
    validate: {
      validator: function(skills) {
        return skills.length === 4
      },
      message: 'Cada agente debe tener 4 habilidades'
    }
  },
}, {
  timestamps: true
})

const Agent = mongoose.model('Agent', agentSchema)
export default Agent
