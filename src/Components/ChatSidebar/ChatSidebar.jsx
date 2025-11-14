import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Typography,
  Button,
} from "@mui/material";

const ChatSidebar = ({ sessions = [], currentId, onSelect, onNewChat }) => {
  return (
    <Box
      sx={{
        width: 240,
        height: "100vh",
        backgroundColor: "#f5f5f5",
        borderRight: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ p: 2, borderBottom: "1px solid #ccc" }}>
        <Typography variant="h6" align="center" gutterBottom>
          Previous Chats
        </Typography>
        <Button fullWidth variant="outlined" onClick={onNewChat}>
          + New Chat
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <List>
          {sessions.map((session) => (
            <ListItem
              key={session.id}
              button
              selected={session.id === currentId}
              onClick={() => onSelect?.(session.id)}
              sx={{
                "&:hover": { backgroundColor: "#ddd" },
                cursor: "pointer",
              }}
            >
              <ListItemText primary={session.title || `Chat ${session.id}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ChatSidebar;
