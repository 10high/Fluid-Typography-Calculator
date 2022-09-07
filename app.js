const inputData = {
    existingInput: "",
    isDigitKey: key => {
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
    },
    inputFieldIDs: ["remInput", "minScreenInput", "maxScreenInput", "minClampInput", "maxClampInput"],

    isValidInputField: (inputElement = document.activeElement) => inputData.inputFieldIDs.includes(inputElement.id),

    isMinLength: (inputElement = document.activeElement) => {
        inputElement.classList.remove("calculator__inputField--invalid");
        if (inputElement.value.length > 0) {
            return true;
        } else {
            inputElement.classList.add("calculator__inputField--invalid");
            return false;
        }
    }
}

const toggleKeypadPressed = element => {
    element.classList.add("keypad__button--pressed")
    setTimeout(() => {
        element.classList.remove("keypad__button--pressed");
    }, 300);
}

const copyToClipboard = () => navigator.clipboard.writeText(document.querySelector(".calculator__output").value);

const isKeyEnter = event => {
    if (event.key === "Enter") {
        calculateClamp();
    }
}

const digitKeyClicked = event => {
    event.preventDefault();
    toggleKeypadPressed(event.target);
    const clickValue = event.target.value;
    if (!inputData.isDigitKey(clickValue)) {
        if (clickValue === "=") {
            calculateClamp();
        }
        return;
    }
    if (!inputData.isValidInputField()) {
        return;
    }
    const activeInputField = document.activeElement;
    const existingInput = activeInputField.value;
    let selectionStart = activeInputField.selectionStart;
    let selectionEnd = activeInputField.selectionEnd;
    const selectionLength = selectionEnd - selectionStart;
    if ((existingInput.length - selectionLength) + 1 < 5) {
        activeInputField.classList.remove("calculator__inputField--invalid");
        activeInputField.value = activeInputField.value.substring(0, selectionStart)
            + clickValue
            + activeInputField.value.substring(selectionEnd, activeInputField.value.length);
        return;
    }
}

const captureKeyboardInput = event => {
    existingInput = event.target.value;
    inputData.existingInput = existingInput;
}

const monitorKeyboardInput = event => {
    const newInput = event.data;
    const insertedText = Array.from(event.target.value);
    if (newInput === null) {
        if (insertedText.length > 4) {
            event.target.value = inputData.existingInput;
            return;
        }
        for (item of insertedText) {
            if (!inputData.isDigitKey(item)) {
                event.target.value = inputData.existingInput;
                return;
            }
        }
        return;
    }
    if (newInput === "c") {
        const key = document.getElementById("keyC");
        toggleKeypadPressed(key);
        key.click();
        return;
    }
    if (insertedText.length > 4) {
        event.target.value = inputData.existingInput;
    }
    for (item of insertedText) {
        if (!inputData.isDigitKey(item)) {
            event.target.value = inputData.existingInput;
            return;
        }
    }
    const key = document.querySelector(inputData.isDigitKey(newInput));
    toggleKeypadPressed(key);
    event.target.classList.remove("calculator__inputField--invalid");
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
    for (inputField of inputData.inputFieldIDs) {
        if (!inputData.isMinLength(document.querySelector(`#${inputField}`))) {
            invalidFieldInputs++;
        } else {
            inputFieldValues[inputField] = parseInt(document.querySelector(`#${inputField}`).value);
        }
    }
    if (invalidFieldInputs > 0) {
        return;
    } else {
        const vw = (100 * (inputFieldValues.maxClampInput - inputFieldValues.minClampInput)) / (inputFieldValues.maxScreenInput - inputFieldValues.minScreenInput);
        const rem = (((inputFieldValues.minScreenInput * inputFieldValues.maxClampInput) - (inputFieldValues.maxScreenInput * inputFieldValues.minClampInput)) / (inputFieldValues.minScreenInput - inputFieldValues.maxScreenInput)) / inputFieldValues.remInput;
        const outputScreen = document.querySelector(".calculator__output");
        outputScreen.removeAttribute("readonly");
        outputScreen.value = `clamp(${inputFieldValues.minClampInput / inputFieldValues.remInput}rem, ${vw}vw + ${rem}rem, ${inputFieldValues.maxClampInput / inputFieldValues.remInput}rem)`;
        outputScreen.focus();
        outputScreen.setAttribute("readonly", "readonly");
    }
}

addEventListener(elementArray(".keypad__button"), "pointerdown", digitKeyClicked);
document.querySelector(".calculator__clipboard").addEventListener("pointerdown", copyToClipboard);
addEventListener(elementArray(".calculator__inputField"), "beforeinput", captureKeyboardInput);
addEventListener(elementArray(".calculator__inputField"), "input", monitorKeyboardInput);
document.addEventListener("keydown", isKeyEnter);

