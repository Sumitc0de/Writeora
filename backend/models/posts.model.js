const mongoose = require("mongoose");

const postSchema = mongoose.Schema({

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        minlength: 3,
        maxlength: 150,
    },

    subtitle: {
        type: String,
        trim: true,
        maxlength: 250,
    },
    category:{
        type: String,
        required:[true, "category is required"],
        minlength:4,
    },
    slug: {
        type: String,
        unique: true,
        index: true,
        sparse: true, // only validate when provided
    },

    // Images
    headerImage: {
        public_id: { type: String },
        url: { type: String },
    },

    contentImages: [
        {
            public_id: { type: String },
            url: { type: String },
        }
    ],

    content: {
        type: String,
        required: true,
        minlength: 10,
    },

    aiContent: {
        type: String,
        default: "",
    },

    // SEO

    hashtags: [
        {
            type: String,
            trim: true,
            lowercase: true,
        }
    ],

    // keywords: [
    //     {
    //         type: String,
    //         trim: true,
    //         lowercase: true,
    //     }
    // ],

    readingTime: {
        type: Number, // in minutes
        default: 1,
    },

    // Engagement
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            refer: "User"
        }
    ],
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            text: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
        }
    ],
    visibility: {
        type: String,
        enum: ["public", "private", "unlisted"],
        default: "public",
    },

    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft",
    },


    // Analytics
    views: {
        type: Number,
        default: 0,
    },

    bookmarksCount: {
        type: Number,
        default: 0,
    },


    // Versioning (Pro Feature)
    revisions: [
        {
            content: String,
            updatedAt: { type: Date, default: Date.now },
        }
    ],
},
    { timestaps: true })


// Create slug automatically if not provided
postSchema.pre("save", function (next) {
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    }
    next();
});

const Posts = mongoose.models.Posts || mongoose.model("Posts", postSchema);
module.exports = Posts;
