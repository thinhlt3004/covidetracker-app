import {FormControl, FormHelperText, InputLabel, NativeSelect} from '@material-ui/core';

export default function ContrySelector({value, handleOnChange, countries}) {
    return (
        <FormControl>
            <InputLabel htmlFor="country-selector" shrink>Quốc Gia</InputLabel>
            <NativeSelect
            // Default Value
            value={value}
            onChange={handleOnChange}
            // inputProps to add attribute for the select element.
            inputProps={{ 
                name: 'country',
                id: 'country-selector'
             }}
            >
            {countries.map((i) => (
                <option key={i.ISO2} value={i.ISO2.toLowerCase()}>{i.Country}</option>
            ))}
            </NativeSelect>
            <FormHelperText>Chọn Quốc Gia</FormHelperText>
        </FormControl>
    )
}
