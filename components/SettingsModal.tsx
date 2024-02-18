import { useState, useEffect } from "react";
import { TextInput, Button, Group, Box } from "@mantine/core";
import { useChatStore } from "@/stores/ChatStore";
import { refreshModels } from "@/stores/ChatActions";

export default function SettingsModal({ close }: { close: () => void }) {
  const [formState, setFormState] = useState({
    dietaryRestrictions: "",
    nutritionalGoals: "",
    cookingSkillLevel: "",
  });

  useEffect(() => {
    refreshModels();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Values:", formState);
    close();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormState({
      dietaryRestrictions: "",
      nutritionalGoals: "",
      cookingSkillLevel: "",
    });
  };

  return (
    <Box mx="auto">
      <form onSubmit={handleSubmit}>
        <TextInput
          label="Dietary Restrictions"
          placeholder="nut allergy"
          name="dietaryRestrictions"
          value={formState.dietaryRestrictions}
          onChange={handleInputChange}
        />
        <TextInput
          label="Nutritional Goals"
          placeholder="build muscle"
          name="nutritionalGoals"
          value={formState.nutritionalGoals}
          onChange={handleInputChange}
        />
        <TextInput
          label="Cooking Skill Level"
          placeholder="beginner"
          name="cookingSkillLevel"
          value={formState.cookingSkillLevel}
          onChange={handleInputChange}
        />
        <Group position="apart" mt="lg">
          <Button variant="light" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit">Save</Button>
        </Group>
      </form>
    </Box>
  );
}
