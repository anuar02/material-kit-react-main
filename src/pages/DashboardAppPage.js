import { FaBeer } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
import Iconify from '../components/iconify';

// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Личный кабинет </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          ..C возвращением
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Футбольное поле" total={123000} icon={'ion:football'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Теннисный корт" total={132831} color="info" icon={'ph:tennis-ball-fill'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Настольный теннис"
              total={173315}
              color="warning"
              icon={'fa6-solid:table-tennis-paddle-ball'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Баскетбольный корт"
              total={12234}
              color="error"
              icon={'material-symbols:sports-basketball'}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Посетители"
              subheader="(+43%) больше чем в прошлом году"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Астана',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Алматы',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Шымкент',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Сегодня посетили"
              chartData={[
                { label: 'Футбол', value: 13 },
                { label: 'Теннис', value: 8 },
                { label: 'Настольный теннис', value: 32 },
                { label: 'Баскетбол', value: 5 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Статистика по городам"
              subheader="(+13%) больше чем в прошлом году"
              chartData={[
                { label: 'Талдыкорган', value: 400 },
                { label: 'Жезказган', value: 430 },
                { label: 'Караганды', value: 448 },
                { label: 'Темиртау', value: 470 },
                { label: 'Рудный', value: 540 },
                { label: 'Актау', value: 580 },
                { label: 'Семей', value: 690 },
                { label: 'Шымкент', value: 1100 },
                { label: 'Алматы', value: 1200 },
                { label: 'Астана', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Взаимодействия"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} />,
                },
                {
                  name: 'Instagram',
                  value: 411213,
                  icon: <Iconify icon={'logos:instagram-icon'} color="#006097" width={32} />,
                },
                {
                  name: 'Telegram',
                  value: 443232,
                  icon: <Iconify icon={'fontisto:telegram'} color="#1C9CEA" width={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Задачи"
              list={[
                { id: '1', label: 'Закупить новые мячи' },
                { id: '2', label: 'Закупить свистки' },
                { id: '3', label: 'Закупить газон' },
                { id: '4', label: 'Починить баскетбольное кольцо' },
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
