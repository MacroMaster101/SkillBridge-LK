import { TextField } from './AppUI';

/* Kept as a thin alias so existing imports keep working — the real control
   lives in AppUI alongside the rest of the form vocabulary. */
export default function Input(props) {
  return <TextField {...props} />;
}
