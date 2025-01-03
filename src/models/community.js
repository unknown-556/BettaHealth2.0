import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    postedBy: {
      type: String,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    categories: [String],
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        postedBy: {
          type: String,
        },
        text: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          default: '', 
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        reply: [
          {
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              required: true,
            },
            postedBy: {
              type: String,
            },
            text: {
              type: String,
            },
            image: {
              type: String,
            },
            createdAt: {
              type: Date,
              default: Date.now,
            },
          }
        ]
      },
    ],
    viewCount: {
      type: Number,
      default: 0,
    },
  });

const communitySchema = new mongoose.Schema ({
    name: {
        type: String,
        unique: true,
    },
    description: {
        type: String,
        default: '',
    },
    picture: {
        type: String,
        default: '',
    }, 
    tags: [String], 
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',

        }
    ],
    Moderators: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    posts: [articleSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    latestActivity: {
        type: Date,
        default: Date.now,
    },

});


const Community = mongoose.model("Community", communitySchema);
export default Community;