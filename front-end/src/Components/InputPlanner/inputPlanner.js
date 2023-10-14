import { useState } from 'react';
import './inputPlanner.css'
import axios from 'axios'


function InputPlanner( props ){
    axios.defaults.baseURL = 'http://localhost:5000'; // Replace with your API URL
    axios.defaults.withCredentials = true;

    const [primogemInput, setPrimogem] = useState('0');
    const [genesisCrystalInput, setGenesysCrystal] = useState('0');
    const [interwinedFateInput, setInterwinedFate] = useState('0');
    const [selectedCheckbox, setSelectedCheckbox] = useState('');
    const [pityCount, setPityCount] = useState('0');
    const [guaranteeCheck, setGuaranteeCheck] = useState(false);
    const [howManyFive, setHowManyFive] = useState('1');
    const [howManyPrimo, setHowManyPrimo] = useState('0');
    const [welkinShowForm, setwelkinShowForm] = useState(false);
    const [howManyDay, setHowManyDay] = useState('');
    const [welkinPlanTo, setWelkinPlanTo] = useState('0')
    const [bpShowForm, setbpShowForm] = useState(false); 
    const [bpLevel, setBpLevel] = useState('');
    const [bpPlanTo, setBpPlanTo] = useState('');

    const planCheckboxChange = (checkboxValue) => {
        if (selectedCheckbox === checkboxValue) {
          // Uncheck the checkbox if it's already selected
          setSelectedCheckbox('');
        } else {
          // Check the selected checkbox
          setSelectedCheckbox(checkboxValue);
        }
    };
    
    const handlSubmit = async (e) => {
        e.preventDefault();
        const userInput = {
        // "primogems": parseInt(primogemInput),
        // "crystals": parseInt(genesisCrystalInput),
        // "fates": parseInt(interwinedFateInput),
        // "guarantee": guaranteeCheck,
        // "pity": parseInt(pityCount),
        // "targetpatch": 4.2,
        // "half": 1,
        // "fiveorprimos": parseInt(selectedCheckbox),
        // "havewelkin": welkinShowForm, 
        // "havebp": bpShowForm,
        // "welkindays": parseInt(howManyDay),
        // "bp": parseInt(bpLevel),
        // "welkinplan": parseInt(welkinPlanTo),
        // "bpplan": parseInt(bpPlanTo),
        // "fivestars": parseInt(howManyFive),
        // "primowant": parseInt(howManyPrimo)
        
        "primogems": 11347,
        "crystals": 120,
        "fates": 80,
        "guarantee": false,
        "pity": 0,
        "targetpatch": 4.2,
        "half": 1,
        "fiveorprimos": 1,
        "havewelkin": true, 
        "havebp": true,
        "welkindays": 46,
        "bp": 25,
        "welkinplan": 3,
        "bpplan": 2,
        "fivestars": 0,
        "primowant": 100
        };
        console.log(userInput);
        try {
            const response = await axios.post('/api/planner/calculate', userInput);
            const currentPlanResult = response.data;
            // const returnResult = currentPlanResult
            props.onUserInput(currentPlanResult);
            // setPosts(allPosts);
            } catch (err) {
                console.error('Error saving data:', err);
            }
            }

    const welkinCheckboxChange = () => {
    setwelkinShowForm(!welkinShowForm);
    };

    const bpCheckboxChange = () => {
    setbpShowForm(!bpShowForm);
    };

    return(
        <form className='gachaPlanner-form-container' onSubmit={handlSubmit}>
            <div className='gachaPlanner-header'>Gacha Planner</div>
            <div className="gachaPlanner-form-group">
                <label>How many Primogems you have?</label>
                <input 
                    type='number'
                    value={primogemInput}
                    onChange={(e) => setPrimogem(e.target.value)}
                    required
                />        
            </div>
            <div className="gachaPlanner-form-group">
                <label>How many Genesis crystals you have?:</label>
                <input 
                    value={genesisCrystalInput}
                    onChange={(e) => setGenesysCrystal(e.target.value)}
                    type='number'
                    required
                />             
            </div>
            <div className="gachaPlanner-form-group">
                <label>How many Interwined Fate you have</label>
                <input 
                    value={interwinedFateInput}
                    onChange={(e) => setInterwinedFate(e.target.value)}
                    type='number'
                    required/>
            </div>
            <div className="gachaPlanner-form-group">
                <label>Which patch do you planned to use your savings?</label>
                <select>
                    <option value="Fonta">mario</option>
                    <option value="Furina">yoshi</option>
                </select>
            </div>
            <div className="gachaPlanner-form-group">
                <label>Do you want to plan for 5 Star characters</label>
                <input 
                    type='checkbox' 
                    checked={selectedCheckbox === '0'}
                    value={'0'}
                    onChange={(e)=>planCheckboxChange(e.target.value)}/>
                <label>or Primogems</label>
                <input 
                    type='checkbox' 
                    value={'1'}
                    checked={selectedCheckbox === '1'}
                    onChange={(e)=>planCheckboxChange(e.target.value)}/>
            </div>
            {selectedCheckbox === '0' && (
                <div className="gachaPlanner-form-group">
                    <label>What is your pity count?</label>
                    <input 
                        type="number"
                        value={pityCount}
                        onChange={(e) => setPityCount(e.target.value)}
                    />
                    <label>with Guarantee</label>
                    <input 
                        type="checkbox"
                        checked={guaranteeCheck}
                        onChange={(e) => setGuaranteeCheck(e.target.checked)}
                    />
                </div>
            )}
            {selectedCheckbox === '0' && (
                <div className="gachaPlanner-form-group">
                    <label>How many 5 Star you wanted?</label>
                    <input 
                        type="number"
                        value={howManyFive}
                        onChange={(e) => setHowManyFive(e.target.value)}
                    />
                </div>
            )}
            {selectedCheckbox === '1' && (
                <div className="gachaPlanner-form-group">
                    <label>How many Primogems you want?</label>
                    <input 
                        type="number"
                        value={howManyPrimo}
                        onChange={(e) => setHowManyPrimo(e.target.value)}
                    />
                </div>
            )}
            <div className="gachaPlanner-form-group">
                <label>Do you have Welkin (Blessing of the Welkin Moon)?</label>
                    <input
                        type="checkbox"
                        checked={welkinShowForm}
                        onChange={(e) => welkinCheckboxChange(e.target.checked)}
                        />
            </div>
            {welkinShowForm && (
                <div className="gachaPlanner-form-group">
                    <label>How many days left?</label>
                    <input 
                        type="number"
                        value={howManyDay}
                        onChange={(e) => setHowManyDay(e.target.value)}
                     />
                    <label>days</label>
                </div>
            )}
            {welkinShowForm && (
                <div className="gachaPlanner-form-group">
                    <label>Number of Welkin planned to buy</label>
                    <input 
                        type="number" 
                        value={welkinPlanTo}
                        onChange={(e) => setWelkinPlanTo(e.target.value)}
                    />
                </div>
            )}
            <div className="gachaPlanner-form-group">
                <label>Do you have BP (Battle Pass)?</label>
                    <input
                        type="checkbox"
                        checked={bpShowForm}
                        onChange={(e) => bpCheckboxChange(e.target.checked)}/>
            </div>
            {bpShowForm && (
                <div className="gachaPlanner-form-group">
                    <label>Current patch BP level</label>
                    <input 
                        type="number"
                        value={bpLevel}
                        onChange={(e) => setBpLevel(e.target.value)}
                    />
                </div>
            )}
            {bpShowForm && (
                <div className="gachaPlanner-form-group">
                    <label>Number of BP planned to buy</label>
                    <input 
                        type="number"
                        value={bpPlanTo}
                        onChange={(e) => setBpPlanTo(e.target.value)}
                    />
                </div>
            )}
            <button         
                className='gachaPlanner-confirm-btn'
                type='submit'
                onClick={props.onClick}
                >Confirm
            </button>
        </form>
    )
};

export default InputPlanner;