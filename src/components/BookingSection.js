import React, {useState, useEffect} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import * as Yup from 'yup';
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import {useAlertContext} from "../context/alertContext";

const LandingSection = () => {
  const {isLoading, response, submit} = useSubmit();
  const { onOpen } = useAlertContext();
  const [startDate, setStartDate] = useState();



  const formik = useFormik({
    initialValues: {
      firstName: '',
      email: '',
      type: '',
      comment: '',
    },
    onSubmit: (values) => {submit('https://sapphirevn.com/', values)},
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      email: Yup.string().email("Invalid email address").required('Required'),
      comment: Yup.string().min(25, "Must be at least 25 characters").required('Required')
    }),
  });
  useEffect(() => {
    if(response){
      onOpen(response.type, response.message);
        if(response.type === 'success'){
          formik.resetForm()
        }
    }
  },[response])

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#034403fd"
      py={16}
      spacing={8}
    >

      <VStack color= "darkgoldenrod" w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="Book a table">
          Book a Table
        </Heading>
        
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={4}>
            <FormControl>               
                <div class = "placeholder">
            <DatePicker placeholderText="Select your date" 
            selected={startDate} 
            onChange={(date) => setStartDate(date)}/>
      </div>
                
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="time">Select Time</FormLabel>
                <Select id="time" name="time"
                {...formik.getFieldProps('time')}>
                  <option value="6am" >6am</option>
                  <option value="7am">7am</option>
                  <option value="8am" >8am</option>
                  <option value="9am" >9am</option>
                  <option value="10am" >10am</option>
                  <option value="11am" >11am</option>
                  <option value="1pm" >1pm</option>
                  <option value="2pm" >2pm</option>               
                </Select>
              </FormControl>   
              <FormControl isInvalid={!!formik.errors.comment && formik.touched.comment}>
                <FormLabel htmlFor="comment">Note</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  {...formik.getFieldProps('comment')}
                />
                <FormErrorMessage>{formik.errors.comment}</FormErrorMessage>
              </FormControl>
              <Button type="submit" colorScheme="purple" width="full">
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
