import './App.css'
import { Outlet } from 'react-router-dom';
import Header from './component/Header';
import Footer from './component/Footer';
import MobileNavigation from './component/MobileNavigation';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setBannerData, setImageURL } from './store/movieoSlice';
function App() {
  const dispatch = useDispatch()

  const fetchTrendingData = async () => {
    try {

      const response = await axios.get('/trending/all/week')

      dispatch(setBannerData(response.data.results))
      dispatch(setImageURL(response.data.results))

    } catch (error) {
      console.log("error", error)
    }
  }

  const fetchConfiguration = async () => {
    try {

      const response = await axios.get("/configuration")
      dispatch(setImageURL(response.data.images.secure_base_url + "original"))

    } catch (error) {

    }
  }

  
  useEffect(() => {
    fetchTrendingData()
    fetchConfiguration()
  }, [])

  return (
    <main className='pb-14 lg:pb-0'>
      <Header />
      <div className=''>
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  )
}

export default App
