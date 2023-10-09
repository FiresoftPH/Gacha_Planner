import React from 'react'
import './rankingBanner.css'
import CharacterImg from '../../Pictures/EulaInfo.png'

function RankingBanner() {
    const data = [
        { id: 1, name: 'John', pic: CharacterImg },
        { id: 2, name: 'Jane', pic: CharacterImg },
        { id: 3, name: 'Alice', pic: CharacterImg },
    ];
    return (
        <table>
            <thead>
                <tr>
                    <th>5 star Banner Rerun Ranking</th>
                    <th>last rerun patch</th>
                    <th>No. since last rerun</th>   
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={item.id}>
                        <td className='image-ranking-container'>
                                <div className={`characterProfile-container ${index === 0 ? 'first-item' : ''}`}>
                                    <img className='characterImg' src={item.pic} alt={item.name} />
                                </div>
                                <div className={`circle ${index === 0 ? 'first-item' : ''}`}></div>
                        </td>
                        <td className='text-ranking'>{item.name}</td>
                        <td className='text-ranking'>{item.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default RankingBanner
