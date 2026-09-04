import { supabase } from "../config/supabase.js";

export async function updateSkills(req, res) {
  try {
    const { skills } = req.body;
    const userId = req.user.id;

    if (!Array.isArray(skills)) {
      return res.status(400).json({ error: "Skills must be an array" });
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({ skills })
      .eq("id", userId)
      .select();

    if (error) throw error;

    res.json({ message: "Skills updated", data: data[0] });
  } catch (error) {
    console.error("Error updating skills:", error);
    res.status(500).json({ error: error.message });
  }
}
