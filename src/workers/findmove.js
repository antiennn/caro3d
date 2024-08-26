import { findLimitdepth, minimax } from "../utils/minmaxalgorithm";

/* eslint-disable no-restricted-globals */
self.onmessage = function (e) {
    var limitdepth = findLimitdepth(e.data.board);
    
    var res = minimax(e.data.board, e.data.depth, e.data.isMaximizingPlayer, -1000, 1000,limitdepth);
    postMessage(res);
};