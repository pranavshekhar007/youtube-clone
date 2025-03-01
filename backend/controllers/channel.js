import Channel from "../models/Channel";
// Create a new channel
export const createChannel = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newChannel = new Channel({ name, description, owner: req.user.id });
    await newChannel.save();
    res.status(201).json(newChannel);
  } catch (error) {
    res.status(500).json({ error: "Failed to create channel" });
  }
};

// Fetch a channel by ID
export const getChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.channelId).populate("owner", "name");
    if (!channel) return res.status(404).json({ error: "Channel not found" });
    res.json(channel);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch channel" });
  }
};

// Delete a channel (Only the owner can delete)
export const deleteChannel = async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.channelId);
    if (!channel) return res.status(404).json({ error: "Channel not found" });
    if (channel.owner.toString() !== req.user.id) return res.status(403).json({ error: "Unauthorized" });

    await channel.deleteOne();
    res.json({ message: "Channel deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete channel" });
  }
};
