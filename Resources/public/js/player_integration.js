(function($)
{
    $(function()
    {
        $('.track .player').each(function(index, element)
        {
            var player_id           = 'jplayer_' + index,
                player_controls_id  = 'jp_container_' + index,

                player_continer     = $(element),
                media_path          = player_continer.data('media-path'),

                player              = $('<div id="' + player_id + '" class="jp-jplayer"></div>'),
                // каждому плееру нужны свои контролы с уникальным id
                player_controls     = $('#jp_container_prototype').clone().attr('id', player_controls_id);

            player_continer.append(player_controls);
            player_continer.append(player);

            player.jPlayer(
            {
                ready: function ()
                {
                    player.jPlayer('setMedia',
                    {
                        mp3: media_path
                    });
                },
                play: function()
                {
                    player.jPlayer('pauseOthers');
                },
                swfPath: '/bundles/imjplayer/swf',
                supplied: 'mp3',
                wmode: 'window',
                cssSelectorAncestor: '#' + player_controls_id
            });
        });

        $('.track .play').each(function()
        {
            var play_button         = $(this),
                player_container    = play_button.parents('.track').find('.player'),
                player              = player_container.find('.jp-jplayer'),
                player_controls     = player_container.find('.jp-audio');

            play_button.click(function()
            {
                if (play_button.hasClass('play'))
                {
                    play_button.removeClass('play icon-play-circle')
                               .addClass('stop icon-remove-circle');

                    player_controls.show('slow');
                    player.jPlayer('play');
                }
                else if (play_button.hasClass('stop'))
                {
                    play_button.removeClass('stop icon-remove-circle')
                               .addClass('play icon-play-circle');

                    player_controls.hide('slow');
                    player.jPlayer('stop');
                }
            });
        });
    });
})($)
