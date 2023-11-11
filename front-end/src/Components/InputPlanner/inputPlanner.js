import { useState, useEffect } from 'react';
import './inputPlanner.css'
import primogemPic from '../../Pictures/primogem.png'
import genesisPic from '../../Pictures/genesis.png'
import interwinedFatePic from '../../Pictures/interwinedFate.png'
import patchIcon from '../../Pictures/patchIcon.png'
import wishIcon from '../../Pictures/wishIcon.png'
import welkinIcon from '../../Pictures/welkinIcon.png'
import bpIcon from '../../Pictures/bpIcon.png'
import dropArrow from '../../Pictures/dropArrow.png'
import axiosInstance from '../../axiosConfig'

function InputPlanner(props) {
    const [recentPatchData, setData] = useState([]);
    const [patchList, setPatchList] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false); // Prevent infinite loop

    useEffect(() => {
        if (!isDataLoaded) {axiosInstance.get('/planner/check-valid-banner')
            .then((response) => {
                // Handle the successful response here
                // console.log('ho');
                // console.log(response.data.load);
                setData(response.data.load);
                const patchList = generateRandomNumbers(response.data.load); // Pass response.data.load directly
                // console.log(patchList);
                setPatchList(patchList);
                setTargetPatch(response.data.load[0]);
                setTargetHalf(response.data.load[1]);
                setIsDataLoaded(true);
            })
            .catch((error) => {
                // Handle errors here
                console.error("Error fetching data: ", error);
            });
        }    
    }, [recentPatchData]);

    console.log('Configured baseURL in inputPLanner', axiosInstance.defaults.baseURL);

    const [primogemInput, setPrimogem] = useState('0');
    const [genesisCrystalInput, setGenesysCrystal] = useState('0');
    const [interwinedFateInput, setInterwinedFate] = useState('0');
    const [selectedCheckbox, setSelectedCheckbox] = useState('');
    const [pityCount, setPityCount] = useState('0');
    const [guaranteeCheck, setGuaranteeCheck] = useState(false);
    const [howManyFive, setHowManyFive] = useState('1');
    const [howManyPrimo, setHowManyPrimo] = useState('0');
    const [welkinShowForm, setwelkinShowForm] = useState(false);
    const [howManyDay, setHowManyDay] = useState('0');
    const [welkinPlanTo, setWelkinPlanTo] = useState('0')
    const [bpShowForm, setbpShowForm] = useState(false);
    const [bpLevel, setBpLevel] = useState('0');
    const [bpPlanTo, setBpPlanTo] = useState('0');
    // const [targetpatch, setTargetPatch] = useState(parseFloat(data[0]));
    const [targetpatch, setTargetPatch] = useState('');
    const [targetHalf, setTargetHalf] = useState();

    const generateRandomNumbers = (currentPatch) => {
        let patchInt = parseInt(currentPatch[0]);
        let patchDeci = Math.round((currentPatch[0] - patchInt) * 10);
        let half = currentPatch[1];
        let patchList = [];

        while (patchList.length <= 10) {
            patchList.push([String(patchInt + '.' + patchDeci), half]);
            if (half === 1) {
                half = 2;
            } else {
                if (patchDeci === 8) {
                    patchInt += 1;
                    patchDeci = 0;
                } else {
                    patchDeci += 1;
                    half = 1;
                }
            }
        }
        return patchList
    };

    const handleSelectChange = (event) => {
        let patchString = event.target.value;
        // console.log(patchString);
        let patchNum = patchString.split(',');
        // console.log(patchNum[1]);
        setTargetPatch(patchNum[0]);
        setTargetHalf(patchNum[1]);
        // setTargetHalf(event.target.value[1]);
    };

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

        if (selectedCheckbox !== '0' && selectedCheckbox !== '1') {
            alert('Please select 5 Star characters or Primogems before submitting the form.');
            return; // Prevent form submission if validation fails
        }
        
        const userInput = {
            "primogems": parseInt(primogemInput),
            "crystals": parseInt(genesisCrystalInput),
            "fates": parseInt(interwinedFateInput),
            "guarantee": guaranteeCheck,
            "pity": parseInt(pityCount),
            "targetpatch": targetpatch,
            "half": parseInt(targetHalf),
            "fiveorprimos": parseInt(selectedCheckbox),
            "havewelkin": welkinShowForm, 
            "havebp": bpShowForm,
            "welkindays": parseInt(howManyDay),
            "bp": parseInt(bpLevel),
            "welkinplan": parseInt(welkinPlanTo),
            "bpplan": parseInt(bpPlanTo),
            "fivestars": parseInt(howManyFive),
            "primowant": parseInt(howManyPrimo)

            // "primogems": 11347,
            // "crystals": 120,
            // "fates": 80,
            // "guarantee": false,
            // "pity": 0,
            // // "targetpatch": targetpatch,
            // "targetpatch": '4.2',
            // // "half": parseInt(targetHalf),
            // "half": 2,
            // "fiveorprimos": 0,
            // "havewelkin": true,
            // "havebp": true,
            // "welkindays": 46,
            // "bp": 25,
            // "welkinplan": 3,
            // "bpplan": 2,
            // "fivestars": 2,
            // "primowant": 0
        };
        console.log("input from inputPlanner", userInput);
        props.onUserInput(userInput);
        // try {
        //     const response = await axios.post('/planner/calculate', userInput);
        //     const currentPlanResult = response.data;
        //     props.onUserInput(userInput);
        //     props.onUserResult(currentPlanResult);
        // } catch (err) {
        //     console.error('Error: ', err);
        // }
    }

    const welkinCheckboxChange = () => {
        setwelkinShowForm(!welkinShowForm);
    };

    const bpCheckboxChange = () => {
        setbpShowForm(!bpShowForm);
    };

    return (
        <form className='gachaPlanner-form-container' onSubmit={handlSubmit}>
            <div className='gachaPlanner-header'>
                <img className='icon-header' src={wishIcon} />
                <h1>Gacha Planner</h1>
            </div>
            <div className='gachaPlanner-input-section'>
                <div className="gachaPlanner-form-group">
                    <img className='icon' src={primogemPic} />
                    <label>How many Primogems you have?</label>
                    <input
                        type='number'
                        value={primogemInput}
                        onChange={(e) => setPrimogem(e.target.value)}
                    />
                </div>
                <div className="gachaPlanner-form-group">
                    <img className='icon' src={genesisPic} />
                    <label>How many Genesis crystals you have?:</label>
                    <input
                        value={genesisCrystalInput}
                        onChange={(e) => setGenesysCrystal(e.target.value)}
                        type='number'
                    />
                </div>
                <div className="gachaPlanner-form-group">
                    <img className='icon' src={interwinedFatePic} />
                    <label>How many Interwined Fate you have</label>
                    <input
                        value={interwinedFateInput}
                        onChange={(e) => setInterwinedFate(e.target.value)}
                        type='number'/>
                </div>
                <div className="gachaPlanner-form-group">
                    <img className='icon' src={patchIcon} />
                    <label>Which patch do you planned to use your savings?</label>
                    { isDataLoaded === true && <select className='patchDropDown' onChange={handleSelectChange}>
                        {patchList.map((item, index) => (
                            <option key={index} value={item}>{item[0] + " " + (item[1] === 1 ? 'First half' : 'Second half')}</option>
                        ))}
                    </select>}
                </div>
                <div className="gachaPlanner-form-group">
                    <img className='icon' src={wishIcon} />
                    <label>Do you want to plan for 5 Star characters</label>
                    <input
                        type='checkbox'
                        checked={selectedCheckbox === '0'}
                        value={'0'}
                        onChange={(e) => planCheckboxChange(e.target.value)} />
                    <label>or Primogems</label>
                    <input
                        type='checkbox'
                        value={'1'}
                        checked={selectedCheckbox === '1'}
                        onChange={(e) => planCheckboxChange(e.target.value)} />
                </div>
                {selectedCheckbox === '0' && (
                    <div className="gachaPlanner-form-group">
                        <img className='icon' src={dropArrow} />
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
                        <img className='icon' src={dropArrow} />
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
                        <img className='icon' src={dropArrow} />
                        <label>How many Primogems you want?</label>
                        <input
                            type="number"
                            value={howManyPrimo}
                            onChange={(e) => setHowManyPrimo(e.target.value)}
                        />
                    </div>
                )}
                <div className="gachaPlanner-form-group">
                    <img className='icon' src={welkinIcon} />
                    <label>Do you have Welkin (Blessing of the Welkin Moon)?</label>
                    <input
                        type="checkbox"
                        checked={welkinShowForm}
                        onChange={(e) => welkinCheckboxChange(e.target.checked)}
                    />
                </div>
                {welkinShowForm && (
                    <div className="gachaPlanner-form-group">
                        <img className='icon' src={dropArrow} />
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
                        <img className='icon' src={dropArrow} />
                        <label>Number of Welkin planned to buy</label>
                        <input
                            type="number"
                            value={welkinPlanTo}
                            onChange={(e) => setWelkinPlanTo(e.target.value)}
                        />
                    </div>
                )}
                <div className="gachaPlanner-form-group">
                    <img className='icon' src={bpIcon} />
                    <label>Do you have BP (Battle Pass)?</label>
                    <input
                        type="checkbox"
                        checked={bpShowForm}
                        onChange={(e) => bpCheckboxChange(e.target.checked)} />
                </div>
                {bpShowForm && (
                    <div className="gachaPlanner-form-group">
                        <img className='icon' src={dropArrow} />
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
                        <img className='icon' src={dropArrow} />
                        <label>Number of BP planned to buy</label>
                        <input
                            type="number"
                            value={bpPlanTo}
                            onChange={(e) => setBpPlanTo(e.target.value)}
                        />
                    </div>
                )}
            </div>
            <button
                className='gachaPlanner-confirm-btn'
                type='submit'
                // onClick={props.onClick}
            >Generate Planner
            </button>
        </form>
    )
};

export default InputPlanner;
