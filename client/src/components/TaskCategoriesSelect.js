import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function TaskCategoriesSelect({ currentSelectedCategories, currentEditData, setCurrentEditData, currentPostCategories, setCurrentPostCategories }) {

    useEffect(() => {
        fetch('/task_categories')
        .then(r => {
            r.ok ? r.json().then(data => setCategoriesFetch(data))
            : r.json().then(error => console.log(error))
        })
    }, [])

    const categoriesArray = () => {
        let array = []
        currentSelectedCategories.forEach(category => array.push(category.name))
        return array
    }

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [categoriesFetch, setCategoriesFetch] = React.useState([])
  const [currentCategoriesArray, setCurrentCategoriesArray] = React.useState(categoriesArray)

    // console.log(categoriesFetch)
    // console.log(currentCategoriesArray)
//   console.log(categoriesArray())

    function setEditData(arr) {
        // console.log(currentCategoriesArray)
        let array = categoriesFetch.filter(category => {
            if (arr.includes(category.name)) return category
        })
        // console.log(array)
        // setCurrentEditData({...currentEditData, task_categories: array})
        return array
    }

    

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCurrentCategoriesArray(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    setCurrentPostCategories(setEditData(typeof value === 'string' ? value.split(',') : value,))
  };

  return (
    <div>
      <FormControl sx={{ m: 0, width: '100%' }}>
        <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={currentCategoriesArray}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Categories" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {categoriesFetch.map((category) => (
            <MenuItem
              key={category.name}
              value={category.name}
            //   style={getStyles(category.name, personName, theme)}
            >
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}