const isDigitKey = key => {
    const digitKeys = {
        0: "#key0",
        1: "#key1",
        2: "#key2",
        3: "#key3",
        4: "#key4",
        5: "#key5",
        6: "#key6",
        7: "#key7",
        8: "#key8",
        9: "#key9"
    }
    return Object.hasOwn(digitKeys, key) ? digitKeys[key] : false;
}

const isActionKey = key => {
    const actionKeys = {
        "c": "#keyC",
        "=": "#keyEquals"
    }
    return Object.hasOwn(actionKeys, key) ? actionKeys[key] : false;
}

inputFieldIDs = ["remInput", "minScreenInput", "maxScreenInput", "minClampInput", "maxClampInput"];

const isValidInputField = (inputElement = document.activeElement) => inputFieldIDs.includes(inputElement.id);

const specialKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Backspace", "Delete"];

const isMinLength = (inputElement = document.activeElement) => {
    inputElement.classList.remove("calculator__inputField--invalid");
    if (inputElement.value.length > 0) {
        return true;
    } else {
        inputElement.classList.add("calculator__inputField--invalid");
        return false;
    }
}

const insertNewValue = (inputtedValue, inputElement = document.activeElement) => {
    let existingValue = inputElement.value;
    if (existingValue === "0") {
        existingValue = "";
    }
    inputElement.value = `${existingValue}${inputtedValue}`;
}

const isNotMaxLength = (inputElement = document.activeElement) => {
    return inputElement.value.length < 4;
}

const toggleKeypadPressed = element => element.classList.toggle("keypad__button--pressed");

const keyClickedDown = (event) => {
    event.preventDefault();
    toggleKeypadPressed(event.target);
    if (isDigitKey(event.target.value) && isValidInputField() && isNotMaxLength()) {
        insertNewValue(event.target.value);
    }
}

const keyClickedUp = (event) => toggleKeypadPressed(event.target);

const keyPressedDown = (event) => {
    if (isValidInputField() && !isNotMaxLength() && !specialKeys.includes(event.key)) {
        if (isDigitKey(event.key)) {
            let key = document.querySelector(isDigitKey(event.key));
            toggleKeypadPressed(key);
        }
        event.preventDefault();
    }
    if (isDigitKey(event.key) && isValidInputField() && isNotMaxLength()) {
        event.preventDefault();
        let key = document.querySelector(isDigitKey(event.key));
        toggleKeypadPressed(key);
        insertNewValue(event.key);
        return;
    }
    if (event.key === "c") {
        let key = document.querySelector(isActionKey("c"));
        toggleKeypadPressed(key);
        key.click();
        return;
    }
}

const keyPressedUp = (event) => {
    if (isDigitKey(event.key)) {
        let key = document.querySelector(isDigitKey(event.key));
        toggleKeypadPressed(key);
        return
    }
    if (event.key === "c") {
        let key = document.querySelector(isActionKey(event.key));
        toggleKeypadPressed(key);
        return;
    }
}

const elementArray = query => document.querySelectorAll(query);

const addEventListener = (elementArray, eventType, func) => {
    elementArray.forEach(item => item.addEventListener(eventType, func))
}

const calculateClamp = () => {
    const inputFieldValues = {
        "remInput": 0,
        "minScreenInput": 0,
        "maxScreenInput": 0,
        "minClampInput": 0,
        "maxClampInput": 0
    }
    let invalidFieldInputs = 0;
    for (inputField of inputFieldIDs) {
        if (!isMinLength(document.querySelector(`#${inputField}`))) {
            invalidFieldInputs++;
        } else {
            inputFieldValues[inputField] = document.querySelector(`#${inputField}`).value;
        }
    }
    if (invalidFieldInputs > 0) {
        return;
    } else {
        const vw = (100 * (inputFieldValues.maxClampInput - inputFieldValues.minClampInput)) / (inputFieldValues.maxScreenInput - inputFieldValues.minScreenInput);
        const rem = (((inputFieldValues.minScreenInput * inputFieldValues.maxClampInput) - (inputFieldValues.maxScreenInput * inputFieldValues.minClampInput)) / (inputFieldValues.minScreenInput - inputFieldValues.maxScreenInput)) / inputFieldValues.remInput;
        document.querySelector(".calculator__output").value = `clamp(${inputFieldValues.minClampInput / inputFieldValues.remInput}rem, ${vw}vw + ${rem}rem, ${inputFieldValues.maxClampInput / inputFieldValues.remInput}rem)`;
    }
}


addEventListener(elementArray(".keypad__button"), "mousedown", keyClickedDown);
addEventListener(elementArray(".keypad__button"), "mouseup", keyClickedUp);
document.addEventListener("keydown", keyPressedDown);
document.addEventListener("keyup", keyPressedUp);


