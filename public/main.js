const FORM = document.querySelector('#vote-form');

FORM.addEventListener('submit', (e) => {
    e.preventDefault();

    const choice = document.querySelector('input[name=os]:checked').value;
    const data = {
        os: choice
    }
    console.log(data);
    fetch('http://localhost:3000/poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-type': 'application/json'
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    

});

fetch('http://localhost:3000/poll')
.then(res => res.json())
.then(data => {
    const votes = data.votes;
    const totalVotes = votes.length;


    //Count vote points
    const voteCounts = votes.reduce(
        (acc, vote) => 
        (
            (acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc
        ),
        {}
    );

    console.log(voteCounts);
    let dataPoints = [
        { label: 'windows', y: voteCounts.windows},
        { label: 'macos', y: voteCounts.macos},
        { label: 'linux', y: voteCounts.linux},
    ]
    
    const chartContainer = document.querySelector("#chartContainer");
    
    if(chartContainer){
        const chart = new CanvasJS.Chart('chartContainer', {
            theme: 'dark2',
            animationEnabled: true,
            title: {
                text: 'results'
            },
            data: [
                {
                    type: 'column',
                    dataPoints: dataPoints
                }
            ]
        });
    
        chart.render();
    
            // Enable pusher logging - don't include this in production
            Pusher.logToConsole = true;

            //insert your pusher publicId here
            
            let pusher = new Pusher('0217b250500385193422', {
            cluster: 'us2',
            forceTLS: true
            });
        
            let channel = pusher.subscribe('os-poll');
            channel.bind('os-vote', function(data) {
            dataPoints = dataPoints.map(x => {
                if(x.label == data.os){
                    x.y += data.points;
                    return x;
                }else {
                    return x;
                }
            });
            chart.render();
            });
    
    
    }
    
})