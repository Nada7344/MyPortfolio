import mongoose from 'mongoose';

const skillsSchema = new mongoose.Schema(
    {
      description: {
            type: String,
            required: true,
            trim: true,
            default:
                'Technologies and tools I use to build scalable, secure and reliable backend systems.',
        },

        items: {
            type: [
                {
                    name: { type: String, required: true, trim: true },
                    icon: { type: String, trim: true, default: '' },
                },
            ],
            default: [],
        },
    },
    {
        collection: 'Skills',
        timestamps: true,
        strict: true,
    }
);

export const SkillsModel =
    mongoose.models.Skills ||
    mongoose.model('Skills', skillsSchema);