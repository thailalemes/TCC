import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';
import { GoogleMap, LoadScript, Marker, Polyline, StreetViewPanorama } from '@react-google-maps/api';

import logoImg2 from '../../assets/logoWhite.png';

export default function ProfileAdm(){

    const [schedule, setSchedule] = useState([]);

    const history = useHistory();

    const userCpf = localStorage.getItem('userCpf');
    const userName = localStorage.getItem('userName');
    const containerStyle = {
        width: '1130px',
        height: '850px'
      };

      const [ currentPosition, setCurrentPosition ] = useState({});
      
      const centers = {
        lat: -22.3583, 
        lng: -47.3859,
      };

      const [ selected, setSelected ] = useState({});

      const onSelect = item => {
        setSelected(item);
      }

      const positions = [
        {
            name: "Location 1",
            location: { 
              lat: -22.352857354822536, 
              lng: -47.33924108864638,
            },
          },
          {
            name: "Location 2",
            location: { 
              lat: -22.363808369637848,
              lng: -47.38295593097408
            },
          },
          {
            name: "Location 3",
            location: { 
              lat: -22.364155635115807, 
              lng: -47.38429703548031
            },
          },
          {
            name: "Location 4",
            location: { 
              lat: -22.36660208552721, 
              lng: -47.391157994892254
            },
          },
          {
            name: "Location 5",
            location: { 
              lat: -22.344471313225966, 
              lng: -47.37365097330218
            },
          },
          { 
            name: "Location 6",
            location: { 
            lat: -22.344471313225965, 
            lng: -47.37365097330217
            }
          },
          { 
            name: "Location 7",
            location:  { 
            lat: -22.36, 
            lng: -47.37365097330217
            }
          },
        ];

      const onLoad = marker => {
        console.log('marker: ', marker)
      }

      const onLoad2 = polyline => {
        console.log('polyline: ', polyline)
      };

      const path = [
        { lat: -22.352857354822536, 
          lng: -47.33924108864638,},
        { lat: -22.363808369637848,
          lng: -47.38295593097408},
        {lat: -22.364155635115807, 
          lng: -47.38429703548031},
        { lat: -22.36660208552721, 
          lng: -47.391157994892254
        },
        { lat: -22.344471313225966, 
          lng: -47.37365097330218
        },
        { lat: -22.344471313225965, 
          lng: -47.37365097330217
        },
        { lat: -22.36, 
          lng: -47.37365097330217
        }
      ]

      const options = {
        strokeColor: '#228B22',
        strokeOpacity: 1,
        strokeWeight: 4,
        fillColor: '#228B22',
        fillOpacity: 0.35,
        clickable: true,
        draggable: true,
        editable: true,
        visible: true,
        radius: 30000,
        paths: [
          { lat: -22.352857354822536, 
            lng: -47.33924108864638,
          },
          { lat: -22.363808369637848,
            lng: -47.38295593097408},
          {lat: -22.364155635115807, 
            lng: -47.38429703548031
          },
          { lat: -22.36660208552721, 
            lng: -47.391157994892254
          },
          { lat: -22.344471313225966, 
            lng: -47.37365097330218
          },
          { lat: -22.344471313225965, 
            lng: -47.37365097330217
          },
          { lat: -22.36, 
            lng: -47.37365097330217
          }
        ],
        zIndex: 1
      };

      const success = position => {
        const currentPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        setCurrentPosition(currentPosition);
      };

      const onMarkerDragEnd = (e) => {
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
        setCurrentPosition({ lat, lng})
      };

    useEffect(() =>  {
        api.get('users', {
            headers: {
                Authorization: userCpf,
            }
        }).then(response => {
            setSchedule(response.data);
            console.log(response.data)
            console.log(response.data)
        })
    }, [userCpf]);

    useEffect(() => {
      navigator.geolocation.getCurrentPosition(success);
    })

    async function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg2} alt="CollectIt" />
                <span>Bem vindo(a), {userName}!</span>

                <Link className="button" to="/report">
                    Emitir Relatório
                </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#228B22" />
                </button>
            </header>
            <body>
                <h1>Agendamentos</h1>
               <LoadScript
                googleMapsApiKey="AIzaSyCqxJmocZKui0kmjiM_tGq_IVNcCqZNbdg"
                region='BR'
                >
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={centers}
                        zoom={15}
                    >
                          {
                          currentPosition.lat ? 
                          <Marker
                          position={currentPosition}
                          onDragEnd={(e) => onMarkerDragEnd(e)}
                          draggable={true} /> :
                          null
                        }
                        {
                      positions.map(item => {
                      return (
                        <Marker
                          key={item.name}
                          onLoad={onLoad}
                          position={item.location}
                          onClick={() => onSelect(item)}
                          />
                      )
                      })
                      }
                     <Polyline
                      onLoad={onLoad2}
                      path={path}
                      options={options}
                    />

                    </GoogleMap>
                </LoadScript>
            </body>
        </div>

    )
}