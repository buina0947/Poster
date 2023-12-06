const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;

const url = 'mongodb://root:root@localhost:27017';

const corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

async function connectToDatabase() {
  const client = new MongoClient(url, { useUnifiedTopology: true });
  await client.connect();
  return client.db('lab3');
}

app.post('/posts', async (req, res) => {
  console.log("Method to create post was called");
  try {
    const db = await connectToDatabase();
    const collection = db.collection('posts');

    const post = req.body;
    const result = await collection.insertOne(post);

    console.log(`Inserted ${result.insertedCount} post into the collection.`);
    res.json({ message: 'Post created successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating post' });
  }
});

app.put('/posts/:postId', async (req, res) => {
  console.log("Method to update post was called");
  let client;

  try {
    client = await connectToDatabase();
    const collection = client.collection('posts');

    const postId = req.params.postId;
    const updatedPost = req.body;

    if (!updatedPost.postTitle || !updatedPost.postDescription || !updatedPost.postAuthor) {
      return res.status(400).json({ message: 'Incomplete data provided for post update' });
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(postId) },
      {
        $set: {
          postTitle: updatedPost.postTitle,
          postDescription: updatedPost.postDescription,
          postAuthor: updatedPost.postAuthor,
        }
      }
    );

    console.log(`Updated ${result.modifiedCount} post in the collection.`);

    if (result.matchedCount > 0) {
      res.json({ message: 'Post updated successfully!' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating post' });
  } finally {
    if (client) {
      client.close();
    }
  }
});

app.get('/posts', async (req, res) => {
  console.log("Method to get all posts");
  try {
    const db = await connectToDatabase();
    const collection = db.collection('posts');

    const posts = await collection.find({}).toArray();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error connecting to MongoDB');
  }
});

app.delete('/posts/:postId', async (req, res) => {
  const postId = req.params.postId;
  console.log("Method to delete post was called", postId);

  try {
    const db = await connectToDatabase();
    const collection = db.collection('posts');

    const postObjectId = new ObjectId(postId);
    const result = await collection.deleteOne({ _id: postObjectId });

    if (result.deletedCount === 1) {
      console.log(`Deleted post with ID: ${postId}`);
      res.json({ message: 'Post deleted successfully!' });
    } else {
      console.log(`Post with ID ${postId} not found`);
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting post' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
