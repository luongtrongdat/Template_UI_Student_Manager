import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import type { Student } from './types';

interface Props {
  open: boolean;
  initial?: Partial<Student>;
  onClose: () => void;
  onSubmit: (data: { id?: string; name: string; age: number; grade: string }) => void;
}

const StudentForm: React.FC<Props> = ({ open, initial = {}, onClose, onSubmit }) => {
  const [name, setName] = useState(initial.name ?? '');
  const [age, setAge] = useState(initial.age ?? 16);
  const [grade, setGrade] = useState(initial.grade ?? '');

  useEffect(() => {
    setName(initial.name ?? '');
    setAge(initial.age ?? 16);
    setGrade(initial.grade ?? '');
  }, [initial, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({
      id: initial.id,
      name: name.trim(),
      age: Number(age),
      grade: grade.trim(),
    });
    // do not close here if you want parent to decide; we'll close after onSubmit in demo
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <DialogTitle>{initial.id ? 'Edit Student' : 'Add Student'}</DialogTitle>
        <DialogContent className="flex flex-col gap-[15px] space-y-4 !pt-2">
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            autoFocus
          />
          <TextField
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            fullWidth
            inputProps={{ min: 1 }}
          />
          <TextField
            label="Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            fullWidth
            placeholder="e.g. 10A1"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {initial.id ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StudentForm;
