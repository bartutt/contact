<?php

/**
* Validator
* 
* @author Bartlomiej Witkowski
* 
*
*/

class Validator{

  /** 
    *   
    * types of regex
    *
    */
    private $regex = array(
		'name' => "/^([\p{L}\s]+)$/u",
    'msg' => '/^([\p{L}0-9\s-.,;:!"%&()?+\'°#\/@]+)$/u',
    'tel'=> "/^[0-9]{3}[0-9]{2}[0-9]{3}$/",
    );


  /** 
    *   
    * This function removes whitespaces, dangerous chars etc..
    * @param input 
    */
    private function inputTrim($input){
        
            $input = trim($input);
            $input = stripslashes($input);
            $input = htmlspecialchars($input);
        return $input;
    }   
    
    private function validate ($input, $regex) {
        
      $input = $this->inputTrim ($input);

      if (!preg_match ($regex, $input) )           
          return false;
     
    }


  /** 
    *   
    * Check if input is ok
    *
    * @public function
    * @param input - input which be validated
    * @param - type of regex
    * @return true if validation ok    
    */

    public function isValid($input, $type) {

      if (!empty ($input)) {
      
        $regex = $this->regex[$type];

        if ($this->validate ($input, $regex) !== false )
            return true;

      }else {
          return false;
      }
    }


    

}
?>