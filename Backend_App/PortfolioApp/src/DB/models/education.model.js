import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
    {
        order: {
            type: Number,
            required: true,
            default: 0,
        },

        dateRange: {
            type: String,
            required: true,
            trim: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        subtitle: {
            type: String,
            required: true,
            trim: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        collection: 'Education',
        timestamps: true,
        strict: true,
    }
);

export const EducationModel =
    mongoose.models.Education ||
    mongoose.model('Education', educationSchema);