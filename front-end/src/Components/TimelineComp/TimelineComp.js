import EulaInfo from '../../Pictures/EulaInfo.png'


export default function Timeline({img_url}) {
    
    return (
    <div className="horizontal-scrolling-box">
        <div className="content">
            <div className='banner-timeline-container'>
                <TimelineComponent imgUrl={EulaInfo} patch={1.0}/>
                <TimeLinecomponent2 p={1.1}></TimeLinecomponent2>


            </div>
        </div>
    </div>


    );
  }
  
  function TimelineComponent({imgUrl,patch}){
    return(
    <div className="timeline-component">
        <div className='element1'>
            <div className="vertical-line"></div>
            <div className='img-test-container1'>
                <img className='img-test' src={imgUrl}></img>
            </div>
            
            <div className="vertical-line2"></div>
            <div className='img-test-container2'>
                <img className='img-test' src={EulaInfo}></img>
            </div>
            <div className="line-horizontal"></div>
            <div className="ellipse-8">
                <div className="ellipse-text">{patch}</div>
            </div>
        </div>
    </div>
    );
  }

  function TimeLinecomponent2({p}){
    return(
    <div className="timeline-component2">
        <div className='element2'>
            <div className="vertical-line"></div>
            <div className='img-test-container1'>
                <img className='img-test' src={EulaInfo}></img>
            </div>
            <div className="vertical-line2"></div>
            <div className='img-test-container2'>
                <img className='img-test' src={EulaInfo}></img>
            </div>
            <div className="line-horizontal"></div>
            <div className="rectangle-58">
                <span className="rectangle-text">{p}</span>
            </div>
        </div>
        

    </div>
    
    );
  }