import {
  Box, Button, Grid, MenuItem, TextField, Typography, InputLabel, Select, FormControl,
} from '@mui/material';
import { useState } from 'react';
import { createPlant, CreatePlantRqDto, updatePlant, UpdatePlantRqDto } from '../../../../services/plants';
import { enqueueSnackbar, useSnackbar } from 'notistack';
import { uploadImageFile } from '../../../../services/images';
import { CreateReliefRqDto, insertRelief, updateRelief, UpdateReliefRqDto } from '../../../../services/relief';

type Props = {
  onCancel: () => void;
  id?: number;
  insertName: string;
  insertDescription: string;
  insertetImage?: string;
  isUpdate: boolean;
  canUserEdit: boolean;
};

const CreateReliefForm = ({ onCancel, id, insertName, insertDescription, isUpdate, canUserEdit  }: Props) => {
  const [formId, setFormId] = useState(id);
  const [name, setName] = useState(insertName);
  const [description, setDescription] = useState(insertDescription);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const { enqueueSnackbar } = useSnackbar();

   const handleUploadObject = async (data: UpdateReliefRqDto) => {
      try {
        const response = await updateRelief(data);
        console.log('AAA', response, typeof response)
        enqueueSnackbar(response.message, { variant: 'success' })
      } catch (error: any) {
        enqueueSnackbar('Что-то пошло не так', { variant: 'error' })
      }
    }

  const handleCreateObject = async (data: CreateReliefRqDto) => {
    try {
      const response = await insertRelief(data);
      enqueueSnackbar(response.message, { variant: 'success' })
    } catch (error: any) {
        enqueueSnackbar('Что-то пошло не так', { variant: 'error' })
    }
  }


  const handleSubmit = () => {
    const upload = async () => {
      const imageId  = (imageFiles.length !== 0)
      ?  await uploadImageFile(imageFiles[0])
      : undefined;

      console.log('ImageId', imageId)
      if (isUpdate) {
        const updateRqDto : UpdateReliefRqDto = {
          relief_id: id,
          relief_name: name,
          relief_description: description,
          relief_picture_id: imageId
        }
        handleUploadObject(updateRqDto);
      } else {
        const plantRqDto : CreateReliefRqDto = {
          relief_name: name,
          relief_description: description,
          relief_picture_id: imageId
      }
        handleCreateObject(plantRqDto);
      }
    }
    
    try {
      upload();
    } catch(error: any) {
      enqueueSnackbar('Что-то пошло не так', { variant: 'error' })
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImageFiles(prev => [...prev, ...files]);
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedFiles = [...imageFiles];
    const updatedPreviews = [...imagePreviews];
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setImageFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Button variant="outlined" onClick={onCancel} sx={{ mb: 2 }}>
        ← Вернуться к рельефам
      </Button>
      <Typography variant="h5" gutterBottom>
        ➕ {(formId === undefined) ? 'Добавление нового рельефа' : `Редактирование рельефа ${name}`}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField 
            fullWidth 
            label="Название рельефа" 
            value={name}
            disabled={ !canUserEdit }
            onChange={(e) => setName(e.target.value)} 
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Описание"
            multiline
            rows={3}
            value={description}
            disabled={ !canUserEdit }
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            {canUserEdit &&
              <label htmlFor="upload-image">
                <input
                  accept="image/*"
                  id="upload-image"
                  type="file"
                  multiple
                  style={{ display: 'none' }}
                  onChange={handleImageUpload}
                />
                <Button variant="text" component="span">
                  📤 Загрузить изображения
                </Button>
              </label>
            }

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 2 }}>
              {imagePreviews.map((preview, index) => (
                <Box key={index} sx={{ position: 'relative', display: 'inline-block'}}>
                  <img
                    src={preview}
                    alt={`preview-${index}`}
                    style={{
                        width: 150,
                        height: 150,
                        objectFit: 'cover',
                        borderRadius: 4,
                        border: '1px solid #ccc'
                    }}
                  />
                  <Button
                    onClick={() => handleRemoveImage(index)}
                    size="small"
                    sx={{
                      position: 'absolute',
                      bottom: 4,
                      right: 0,
                      minWidth: '24px',
                      height: '24px',
                      fontSize: '16px',
                      lineHeight: 1,
                      borderRadius: '50%',
                      backgroundColor: '#f44336',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#d32f2f',
                      },
                    }}
                  >
                    ×
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        {canUserEdit &&
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={onCancel}>
              ❌ Отмена
            </Button>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              💾 Сохранить
            </Button>
          </Grid>
        }
      </Grid>
    </Box>
  );
};

export default CreateReliefForm;
