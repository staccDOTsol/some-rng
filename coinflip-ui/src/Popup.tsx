import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
  px: 4,
  pb: 3,
};

interface PopupProps {
  msg: string;
  status: boolean;
  handleChange: (e: boolean) => void;
}

export default function Popup(props: PopupProps) {
  return (
      <div>
        <Modal
            open={props.status}
            onClose={() => props.handleChange(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
          <Box
              // @ts-ignore
              sx={style}
          >
            <Button onClick={() => props.handleChange(false)}>Close</Button>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Flip Result
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {props.msg}
            </Typography>
          </Box>
        </Modal>
      </div>
  );
}
