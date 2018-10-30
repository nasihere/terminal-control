module.exports = {
  pad: function(n, width, z) {
    if (z == null) {
      z = '0';
    }
    n = n + '';
    if (n.length >= width) {
      return n;
    } else {
      return new Array(width - n.length + 1).join(z) + n;
    }
  }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLmpzIiwic291cmNlUm9vdCI6Ii4uXFwuLiIsInNvdXJjZXMiOlsiY29mZmVlXFxsaWJcXHN0cmluZy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFJQUEsTUlBTSxDSUFDLE9JQVAsR0lLQztBSUFBLEVJQUEsR0lBQSxFSUFLLFNJQUMsQ0lBRCxFSUFJLEtJQUosRUlBVyxDSUFYLEdJQUE7O01JQVcsSUlBSTtLSUVuQjtBSUFBLElJQUEsQ0lBQSxHSUFJLENJQUEsR0lBSSxFSUFSLENJQUE7QUlFQSxJSUFBLElJQUcsQ0lBQyxDSUFDLE1JQUYsSUlBWSxLSUFmO2FJRUMsRUlGRDtLSUFBLE1JQUE7YUlNSyxJSUFBLEtJQUEsQ0lBTSxLSUFBLEdJQVEsQ0lBQyxDSUFDLE1JQVYsR0lBbUIsQ0lBekIsQ0lBMkIsQ0lBQyxJSUE1QixDSUFpQyxDSUFqQyxDSUFKLEdJQTBDLEVJTjNDO0tJSkk7RUlBQSxDSUFMO0NBTEQsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gYXJyYXkgPVxuXG5cdCMjI1xuXHRUcmllcyB0byB0dXJuIGFueXRoaW5nIGludG8gYW4gYXJyYXkuXG5cdCMjI1xuXHRmcm9tOiAocikgLT5cblxuXHRcdEFycmF5OjpzbGljZS5jYWxsIHJcblxuXHQjIyNcblx0Q2xvbmUgb2YgYW4gYXJyYXkuIFByb3BlcnRpZXMgd2lsbCBiZSBzaGFsbG93IGNvcGllcy5cblx0IyMjXG5cdHNpbXBsZUNsb25lOiAoYSkgLT5cblxuXHRcdGEuc2xpY2UgMFxuXG5cdHNoYWxsb3dFcXVhbDogKGExLCBhMikgLT5cblxuXHRcdHJldHVybiBubyB1bmxlc3MgQXJyYXkuaXNBcnJheShhMSkgYW5kIEFycmF5LmlzQXJyYXkoYTIpIGFuZCBhMS5sZW5ndGggaXMgYTIubGVuZ3RoXG5cblx0XHRmb3IgdmFsLCBpIGluIGExXG5cblx0XHRcdHJldHVybiBubyB1bmxlc3MgYTJbaV0gaXMgdmFsXG5cblx0XHR5ZXNcblxuXHRwbHVjazogKGEsIGkpIC0+XG5cblx0XHRyZXR1cm4gYSBpZiBhLmxlbmd0aCA8IDFcblxuXG5cdFx0Zm9yIHZhbHVlLCBpbmRleCBpbiBhXG5cblx0XHRcdGlmIGluZGV4ID4gaVxuXG5cdFx0XHRcdGFbaW5kZXggLSAxXSA9IGFbaW5kZXhdXG5cblx0XHRhLmxlbmd0aCA9IGEubGVuZ3RoIC0gMVxuXG5cdFx0YVxuXG5cdHBsdWNrSXRlbTogKGEsIGl0ZW0pIC0+XG5cblx0XHRyZXR1cm4gYSBpZiBhLmxlbmd0aCA8IDFcblxuXG5cdFx0cmVtb3ZlZCA9IDBcblxuXHRcdGZvciB2YWx1ZSwgaW5kZXggaW4gYVxuXG5cdFx0XHRpZiB2YWx1ZSBpcyBpdGVtXG5cblx0XHRcdFx0cmVtb3ZlZCsrXG5cblx0XHRcdFx0Y29udGludWVcblxuXHRcdFx0aWYgcmVtb3ZlZCBpc250IDBcblxuXHRcdFx0XHRhW2luZGV4IC0gcmVtb3ZlZF0gPSBhW2luZGV4XVxuXG5cdFx0YS5sZW5ndGggPSBhLmxlbmd0aCAtIHJlbW92ZWQgaWYgcmVtb3ZlZCA+IDBcblxuXHRcdGFcblxuXHRwbHVja09uZUl0ZW06IChhLCBpdGVtKSAtPlxuXG5cdFx0cmV0dXJuIGEgaWYgYS5sZW5ndGggPCAxXG5cblx0XHRyZWFjaGVkID0gbm9cblxuXHRcdGZvciB2YWx1ZSwgaW5kZXggaW4gYVxuXG5cdFx0XHRpZiBub3QgcmVhY2hlZFxuXG5cdFx0XHRcdGlmIHZhbHVlIGlzIGl0ZW1cblxuXHRcdFx0XHRcdHJlYWNoZWQgPSB5ZXNcblxuXHRcdFx0XHRcdGNvbnRpbnVlXG5cblx0XHRcdGVsc2VcblxuXHRcdFx0XHRhW2luZGV4IC0gMV0gPSBhW2luZGV4XVxuXG5cdFx0YS5sZW5ndGggPSBhLmxlbmd0aCAtIDEgaWYgcmVhY2hlZFxuXG5cdFx0YVxuXG5cdHBsdWNrQnlDYWxsYmFjazogKGEsIGNiKSAtPlxuXG5cdFx0cmV0dXJuIGEgaWYgYS5sZW5ndGggPCAxXG5cblx0XHRyZW1vdmVkID0gMFxuXG5cdFx0Zm9yIHZhbHVlLCBpbmRleCBpbiBhXG5cblx0XHRcdGlmIGNiIHZhbHVlLCBpbmRleFxuXG5cdFx0XHRcdHJlbW92ZWQrK1xuXG5cdFx0XHRcdGNvbnRpbnVlXG5cblx0XHRcdGlmIHJlbW92ZWQgaXNudCAwXG5cblx0XHRcdFx0YVtpbmRleCAtIHJlbW92ZWRdID0gYVtpbmRleF1cblxuXHRcdGlmIHJlbW92ZWQgPiAwXG5cblx0XHRcdGEubGVuZ3RoID0gYS5sZW5ndGggLSByZW1vdmVkXG5cblx0XHRhXG5cblx0cGx1Y2tNdWx0aXBsZTogKGFycmF5LCBpbmRleGVzVG9SZW1vdmUpIC0+XG5cblx0XHRyZXR1cm4gYXJyYXkgaWYgYXJyYXkubGVuZ3RoIDwgMVxuXG5cdFx0cmVtb3ZlZFNvRmFyID0gMFxuXG5cdFx0aW5kZXhlc1RvUmVtb3ZlLnNvcnQoKVxuXG5cdFx0Zm9yIGkgaW4gaW5kZXhlc1RvUmVtb3ZlXG5cblx0XHRcdEBwbHVjayBhcnJheSwgaSAtIHJlbW92ZWRTb0ZhclxuXG5cdFx0XHRyZW1vdmVkU29GYXIrK1xuXG5cdFx0YXJyYXlcblxuXHRpbmplY3RCeUNhbGxiYWNrOiAoYSwgdG9JbmplY3QsIHNob3VsZEluamVjdCkgLT5cblxuXHRcdHZhbEEgPSBudWxsXG5cblx0XHR2YWxCID0gbnVsbFxuXG5cdFx0bGVuID0gYS5sZW5ndGhcblxuXHRcdGlmIGxlbiA8IDFcblxuXHRcdFx0YS5wdXNoIHRvSW5qZWN0XG5cblx0XHRcdHJldHVybiBhXG5cblxuXHRcdGZvciB2YWwsIGkgaW4gYVxuXG5cdFx0XHR2YWxBID0gdmFsQlxuXG5cdFx0XHR2YWxCID0gdmFsXG5cblx0XHRcdGlmIHNob3VsZEluamVjdCB2YWxBLCB2YWxCLCB0b0luamVjdFxuXG5cdFx0XHRcdHJldHVybiBhLnNwbGljZSBpLCAwLCB0b0luamVjdFxuXG5cdFx0YS5wdXNoIHRvSW5qZWN0XG5cblx0XHRhXG5cblx0aW5qZWN0SW5JbmRleDogKGEsIGluZGV4LCB0b0luamVjdCkgLT5cblxuXHRcdGxlbiA9IGEubGVuZ3RoXG5cblx0XHRpID0gaW5kZXhcblxuXHRcdGlmIGxlbiA8IDFcblxuXHRcdFx0YS5wdXNoIHRvSW5qZWN0XG5cblx0XHRcdHJldHVybiBhXG5cblx0XHR0b1B1dCA9IHRvSW5qZWN0XG5cblx0XHR0b1B1dE5leHQgPSBudWxsXG5cblx0XHRgZm9yKDsgaSA8PSBsZW47IGkrKyl7XG5cblx0XHRcdHRvUHV0TmV4dCA9IGFbaV07XG5cblx0XHRcdGFbaV0gPSB0b1B1dDtcblxuXHRcdFx0dG9QdXQgPSB0b1B1dE5leHQ7XG5cblx0XHR9YFxuXG5cdFx0IyBhW2ldID0gdG9QdXRcblxuXHRcdG51bGwiLCJtb2R1bGUuZXhwb3J0cyA9IGNsYXNzaWMgPSB7fVxuXG4jIExpdHRsZSBoZWxwZXIgZm9yIG1peGlucyBmcm9tIENvZmZlZVNjcmlwdCBGQVEsXG4jIGNvdXJ0ZXN5IG9mIFNldGhhdXJ1cyAoaHR0cDovL2dpdGh1Yi5jb20vc2V0aGF1cnVzKVxuY2xhc3NpYy5pbXBsZW1lbnQgPSAobWl4aW5zLi4uLCBjbGFzc1JlZmVyZW5jZSkgLT5cblxuXHRmb3IgbWl4aW4gaW4gbWl4aW5zXG5cblx0XHRjbGFzc1Byb3RvID0gY2xhc3NSZWZlcmVuY2U6OlxuXG5cdFx0Zm9yIG1lbWJlciBvZiBtaXhpbjo6XG5cblx0XHRcdHVubGVzcyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGNsYXNzUHJvdG8sIG1lbWJlclxuXG5cdFx0XHRcdGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIG1peGluOjosIG1lbWJlclxuXG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBjbGFzc1Byb3RvLCBtZW1iZXIsIGRlc2NcblxuXHRjbGFzc1JlZmVyZW5jZVxuXG5jbGFzc2ljLm1peCA9IChtaXhpbnMuLi4sIGNsYXNzUmVmZXJlbmNlKSAtPlxuXG5cdGNsYXNzUHJvdG8gPSBjbGFzc1JlZmVyZW5jZTo6XG5cblx0Y2xhc3NSZWZlcmVuY2UuX19taXhpbkNsb25lcnMgPSBbXVxuXG5cdGNsYXNzUmVmZXJlbmNlLl9fYXBwbHlDbG9uZXJzRm9yID0gKGluc3RhbmNlLCBhcmdzID0gbnVsbCkgLT5cblxuXHRcdGZvciBjbG9uZXIgaW4gY2xhc3NSZWZlcmVuY2UuX19taXhpbkNsb25lcnNcblxuXHRcdFx0Y2xvbmVyLmFwcGx5IGluc3RhbmNlLCBhcmdzXG5cblx0XHRyZXR1cm5cblxuXHRjbGFzc1JlZmVyZW5jZS5fX21peGluSW5pdGlhbGl6ZXJzID0gW11cblxuXHRjbGFzc1JlZmVyZW5jZS5fX2luaXRNaXhpbnNGb3IgPSAoaW5zdGFuY2UsIGFyZ3MgPSBudWxsKSAtPlxuXG5cdFx0Zm9yIGluaXRpYWxpemVyIGluIGNsYXNzUmVmZXJlbmNlLl9fbWl4aW5Jbml0aWFsaXplcnNcblxuXHRcdFx0aW5pdGlhbGl6ZXIuYXBwbHkgaW5zdGFuY2UsIGFyZ3NcblxuXHRcdHJldHVyblxuXG5cdGNsYXNzUmVmZXJlbmNlLl9fbWl4aW5RdWl0dGVycyA9IFtdXG5cblx0Y2xhc3NSZWZlcmVuY2UuX19hcHBseVF1aXR0ZXJzRm9yID0gKGluc3RhbmNlLCBhcmdzID0gbnVsbCkgLT5cblxuXHRcdGZvciBxdWl0dGVyIGluIGNsYXNzUmVmZXJlbmNlLl9fbWl4aW5RdWl0dGVyc1xuXG5cdFx0XHRxdWl0dGVyLmFwcGx5IGluc3RhbmNlLCBhcmdzXG5cblx0XHRyZXR1cm5cblxuXHRmb3IgbWl4aW4gaW4gbWl4aW5zXG5cblx0XHR1bmxlc3MgbWl4aW4uY29uc3RydWN0b3IgaW5zdGFuY2VvZiBGdW5jdGlvblxuXG5cdFx0XHR0aHJvdyBFcnJvciBcIk1peGluIHNob3VsZCBiZSBhIGZ1bmN0aW9uXCJcblxuXHRcdGZvciBtZW1iZXIgb2YgbWl4aW46OlxuXG5cdFx0XHRpZiBtZW1iZXIuc3Vic3RyKDAsIDExKSBpcyAnX19pbml0TWl4aW4nXG5cblx0XHRcdFx0Y2xhc3NSZWZlcmVuY2UuX19taXhpbkluaXRpYWxpemVycy5wdXNoIG1peGluOjpbbWVtYmVyXVxuXG5cdFx0XHRcdGNvbnRpbnVlXG5cblx0XHRcdGVsc2UgaWYgbWVtYmVyLnN1YnN0cigwLCAxMSkgaXMgJ19fY2xvbmVyRm9yJ1xuXG5cdFx0XHRcdGNsYXNzUmVmZXJlbmNlLl9fbWl4aW5DbG9uZXJzLnB1c2ggbWl4aW46OlttZW1iZXJdXG5cblx0XHRcdFx0Y29udGludWVcblxuXHRcdFx0ZWxzZSBpZiBtZW1iZXIuc3Vic3RyKDAsIDEyKSBpcyAnX19xdWl0dGVyRm9yJ1xuXG5cdFx0XHRcdGNsYXNzUmVmZXJlbmNlLl9fbWl4aW5RdWl0dGVycy5wdXNoIG1peGluOjpbbWVtYmVyXVxuXG5cdFx0XHRcdGNvbnRpbnVlXG5cblx0XHRcdHVubGVzcyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIGNsYXNzUHJvdG8sIG1lbWJlclxuXG5cdFx0XHRcdGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIG1peGluOjosIG1lbWJlclxuXG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBjbGFzc1Byb3RvLCBtZW1iZXIsIGRlc2NcblxuXHRjbGFzc1JlZmVyZW5jZSIsImFycmF5ID0gcmVxdWlyZSAnLi9hcnJheSdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgRW1pdHRlclxyXG5cclxuXHRjb25zdHJ1Y3RvcjogLT5cclxuXHJcblx0XHRAX2xpc3RlbmVycyA9IHt9XHJcblxyXG5cdFx0QF9saXN0ZW5lcnNGb3JBbnlFdmVudCA9IFtdXHJcblxyXG5cdFx0QF9kaXNhYmxlZEVtaXR0ZXJzID0ge31cclxuXHJcblx0b246IChldmVudE5hbWUsIGxpc3RlbmVyKSAtPlxyXG5cclxuXHRcdHVubGVzcyBAX2xpc3RlbmVyc1tldmVudE5hbWVdP1xyXG5cclxuXHRcdFx0QF9saXN0ZW5lcnNbZXZlbnROYW1lXSA9IFtdXHJcblxyXG5cdFx0QF9saXN0ZW5lcnNbZXZlbnROYW1lXS5wdXNoIGxpc3RlbmVyXHJcblxyXG5cdFx0QFxyXG5cclxuXHRvbmNlOiAoZXZlbnROYW1lLCBsaXN0ZW5lcikgLT5cclxuXHJcblx0XHRyYW4gPSBub1xyXG5cclxuXHRcdGNiID0gPT5cclxuXHJcblx0XHRcdHJldHVybiBpZiByYW5cclxuXHJcblx0XHRcdHJhbiA9IHllc1xyXG5cclxuXHRcdFx0ZG8gbGlzdGVuZXJcclxuXHJcblx0XHRcdHNldFRpbWVvdXQgPT5cclxuXHJcblx0XHRcdFx0QHJlbW92ZUV2ZW50IGV2ZW50TmFtZSwgY2JcclxuXHJcblx0XHRcdCwgMFxyXG5cclxuXHRcdEBvbiBldmVudE5hbWUsIGNiXHJcblxyXG5cdFx0QFxyXG5cclxuXHRvbkFueUV2ZW50OiAobGlzdGVuZXIpIC0+XHJcblxyXG5cdFx0QF9saXN0ZW5lcnNGb3JBbnlFdmVudC5wdXNoIGxpc3RlbmVyXHJcblxyXG5cdFx0QFxyXG5cclxuXHRyZW1vdmVFdmVudDogKGV2ZW50TmFtZSwgbGlzdGVuZXIpIC0+XHJcblxyXG5cdFx0cmV0dXJuIEAgdW5sZXNzIEBfbGlzdGVuZXJzW2V2ZW50TmFtZV0/XHJcblxyXG5cdFx0YXJyYXkucGx1Y2tPbmVJdGVtIEBfbGlzdGVuZXJzW2V2ZW50TmFtZV0sIGxpc3RlbmVyXHJcblxyXG5cdFx0QFxyXG5cclxuXHRyZW1vdmVMaXN0ZW5lcnM6IChldmVudE5hbWUpIC0+XHJcblxyXG5cdFx0cmV0dXJuIEAgdW5sZXNzIEBfbGlzdGVuZXJzW2V2ZW50TmFtZV0/XHJcblxyXG5cdFx0QF9saXN0ZW5lcnNbZXZlbnROYW1lXS5sZW5ndGggPSAwXHJcblxyXG5cdFx0QFxyXG5cclxuXHRyZW1vdmVBbGxMaXN0ZW5lcnM6IC0+XHJcblxyXG5cdFx0Zm9yIG5hbWUsIGxpc3RlbmVycyBvZiBAX2xpc3RlbmVyc1xyXG5cclxuXHRcdFx0bGlzdGVuZXJzLmxlbmd0aCA9IDBcclxuXHJcblx0XHRAXHJcblxyXG5cdF9lbWl0OiAoZXZlbnROYW1lLCBkYXRhKSAtPlxyXG5cclxuXHRcdGZvciBsaXN0ZW5lciBpbiBAX2xpc3RlbmVyc0ZvckFueUV2ZW50XHJcblxyXG5cdFx0XHRsaXN0ZW5lci5jYWxsIEAsIGRhdGEsIGV2ZW50TmFtZVxyXG5cclxuXHRcdHJldHVybiB1bmxlc3MgQF9saXN0ZW5lcnNbZXZlbnROYW1lXT9cclxuXHJcblx0XHRmb3IgbGlzdGVuZXIgaW4gQF9saXN0ZW5lcnNbZXZlbnROYW1lXVxyXG5cclxuXHRcdFx0bGlzdGVuZXIuY2FsbCBALCBkYXRhXHJcblxyXG5cdFx0cmV0dXJuXHJcblxyXG5cdCMgdGhpcyBtYWtlcyBzdXJlIHRoYXQgYWxsIHRoZSBjYWxscyB0byB0aGlzIGNsYXNzJ3MgbWV0aG9kICdmbk5hbWUnXHJcblx0IyBhcmUgdGhyb3R0bGVkXHJcblx0X3Rocm90dGxlRW1pdHRlck1ldGhvZDogKGZuTmFtZSwgdGltZSA9IDEwMDApIC0+XHJcblxyXG5cdFx0b3JpZ2luYWxGbiA9IEBbZm5OYW1lXVxyXG5cclxuXHRcdGlmIHR5cGVvZiBvcmlnaW5hbEZuIGlzbnQgJ2Z1bmN0aW9uJ1xyXG5cclxuXHRcdFx0dGhyb3cgRXJyb3IgXCJ0aGlzIGNsYXNzIGRvZXMgbm90IGhhdmUgYSBtZXRob2QgY2FsbGVkICcje2ZuTmFtZX0nXCJcclxuXHJcblx0XHRsYXN0Q2FsbEFyZ3MgPSBudWxsXHJcblx0XHRwZW5kaW5nID0gbm9cclxuXHRcdHRpbWVyID0gbnVsbFxyXG5cclxuXHRcdEBbZm5OYW1lXSA9ID0+XHJcblxyXG5cdFx0XHRsYXN0Q2FsbEFyZ3MgPSBhcmd1bWVudHNcclxuXHJcblx0XHRcdGRvIHBlbmRcclxuXHJcblx0XHRwZW5kID0gPT5cclxuXHJcblx0XHRcdGlmIHBlbmRpbmdcclxuXHJcblx0XHRcdFx0Y2xlYXJUaW1lb3V0IHRpbWVyXHJcblxyXG5cdFx0XHR0aW1lciA9IHNldFRpbWVvdXQgcnVuSXQsIHRpbWVcclxuXHJcblx0XHRcdHBlbmRpbmcgPSB5ZXNcclxuXHJcblx0XHRydW5JdCA9ID0+XHJcblxyXG5cdFx0XHRwZW5kaW5nID0gbm9cclxuXHJcblx0XHRcdG9yaWdpbmFsRm4uYXBwbHkgQCwgbGFzdENhbGxBcmdzXHJcblxyXG5cdF9kaXNhYmxlRW1pdHRlcjogKGZuTmFtZSkgLT5cclxuXHJcblx0XHRpZiBAX2Rpc2FibGVkRW1pdHRlcnNbZm5OYW1lXT9cclxuXHJcblx0XHRcdHRocm93IEVycm9yIFwiI3tmbk5hbWV9IGlzIGFscmVhZHkgYSBkaXNhYmxlZCBlbWl0dGVyXCJcclxuXHJcblx0XHRAX2Rpc2FibGVkRW1pdHRlcnNbZm5OYW1lXSA9IEBbZm5OYW1lXVxyXG5cclxuXHRcdEBbZm5OYW1lXSA9IC0+XHJcblxyXG5cdF9lbmFibGVFbWl0dGVyOiAoZm5OYW1lKSAtPlxyXG5cclxuXHRcdGZuID0gQF9kaXNhYmxlZEVtaXR0ZXJzW2ZuTmFtZV1cclxuXHJcblx0XHR1bmxlc3MgZm4/XHJcblxyXG5cdFx0XHR0aHJvdyBFcnJvciBcIiN7Zm5OYW1lfSBpcyBub3QgYSBkaXNhYmxlZCBlbWl0dGVyXCJcclxuXHJcblx0XHRAW2ZuTmFtZV0gPSBmblxyXG5cclxuXHRcdGRlbGV0ZSBAX2Rpc2FibGVkRW1pdHRlcnNbZm5OYW1lXSIsIl9jb21tb24gPSByZXF1aXJlICcuL19jb21tb24nXG5cbm1vZHVsZS5leHBvcnRzID0gb2JqZWN0ID1cblxuXHRpc0JhcmVPYmplY3Q6IF9jb21tb24uaXNCYXJlT2JqZWN0LmJpbmQgX2NvbW1vblxuXG5cdCMjI1xuXHRpZiBvYmplY3QgaXMgYW4gaW5zdGFuY2Ugb2YgYSBjbGFzc1xuXHQjIyNcblx0aXNJbnN0YW5jZTogKHdoYXQpIC0+XG5cblx0XHRub3QgQGlzQmFyZU9iamVjdCB3aGF0XG5cblx0IyMjXG5cdEFsaWFzIHRvIF9jb21tb24udHlwZU9mXG5cdCMjI1xuXHR0eXBlT2Y6IF9jb21tb24udHlwZU9mLmJpbmQgX2NvbW1vblxuXG5cdCMjI1xuXHRBbGlhcyB0byBfY29tbW9uLmNsb25lXG5cdCMjI1xuXHRjbG9uZTogX2NvbW1vbi5jbG9uZS5iaW5kIF9jb21tb25cblxuXHQjIyNcblx0RW1wdGllcyBhbiBvYmplY3Qgb2YgaXRzIHByb3BlcnRpZXMuXG5cdCMjI1xuXHRlbXB0eTogKG8pIC0+XG5cblx0XHRmb3IgcHJvcCBvZiBvXG5cblx0XHRcdGRlbGV0ZSBvW3Byb3BdIGlmIG8uaGFzT3duUHJvcGVydHkgcHJvcFxuXG5cdFx0b1xuXG5cdCMjI1xuXHRFbXB0aWVzIGFuIG9iamVjdC4gRG9lc24ndCBjaGVjayBmb3IgaGFzT3duUHJvcGVydHksIHNvIGl0J3MgYSB0aW55XG5cdGJpdCBmYXN0ZXIuIFVzZSBpdCBmb3IgcGxhaW4gb2JqZWN0cy5cblx0IyMjXG5cdGZhc3RFbXB0eTogKG8pIC0+XG5cblx0XHRkZWxldGUgb1twcm9wZXJ0eV0gZm9yIHByb3BlcnR5IG9mIG9cblxuXHRcdG9cblxuXHQjIyNcblx0T3ZlcnJpZGVzIHZhbHVlcyBmb21yIGBuZXdWYWx1ZXNgIG9uIGBiYXNlYCwgYXMgbG9uZyBhcyB0aGV5XG5cdGFscmVhZHkgZXhpc3QgaW4gYmFzZS5cblx0IyMjXG5cdG92ZXJyaWRlT250bzogKGJhc2UsIG5ld1ZhbHVlcykgLT5cblxuXHRcdHJldHVybiBiYXNlIGlmIG5vdCBAaXNCYXJlT2JqZWN0KG5ld1ZhbHVlcykgb3Igbm90IEBpc0JhcmVPYmplY3QoYmFzZSlcblxuXHRcdGZvciBrZXksIG9sZFZhbCBvZiBiYXNlXG5cblx0XHRcdG5ld1ZhbCA9IG5ld1ZhbHVlc1trZXldXG5cblx0XHRcdGNvbnRpbnVlIGlmIG5ld1ZhbCBpcyB1bmRlZmluZWRcblxuXHRcdFx0aWYgdHlwZW9mIG5ld1ZhbCBpc250ICdvYmplY3QnIG9yIEBpc0luc3RhbmNlIG5ld1ZhbFxuXG5cdFx0XHRcdGJhc2Vba2V5XSA9IEBjbG9uZSBuZXdWYWxcblxuXHRcdFx0IyBuZXdWYWwgaXMgYSBwbGFpbiBvYmplY3Rcblx0XHRcdGVsc2VcblxuXHRcdFx0XHRpZiB0eXBlb2Ygb2xkVmFsIGlzbnQgJ29iamVjdCcgb3IgQGlzSW5zdGFuY2Ugb2xkVmFsXG5cblx0XHRcdFx0XHRiYXNlW2tleV0gPSBAY2xvbmUgbmV3VmFsXG5cblx0XHRcdFx0ZWxzZVxuXG5cdFx0XHRcdFx0QG92ZXJyaWRlT250byBvbGRWYWwsIG5ld1ZhbFxuXHRcdGJhc2VcblxuXHQjIyNcblx0VGFrZXMgYSBjbG9uZSBvZiAnYmFzZScgYW5kIHJ1bnMgI292ZXJyaWRlT250byBvbiBpdFxuXHQjIyNcblx0b3ZlcnJpZGU6IChiYXNlLCBuZXdWYWx1ZXMpIC0+XG5cblx0XHRAb3ZlcnJpZGVPbnRvIEBjbG9uZShiYXNlKSwgbmV3VmFsdWVzXG5cblx0YXBwZW5kOiAoYmFzZSwgdG9BcHBlbmQpIC0+XG5cblx0XHRAYXBwZW5kT250byBAY2xvbmUoYmFzZSksIHRvQXBwZW5kXG5cblx0IyBEZWVwIGFwcGVuZHMgdmFsdWVzIGZyb20gYHRvQXBwZW5kYCB0byBgYmFzZWBcblx0YXBwZW5kT250bzogKGJhc2UsIHRvQXBwZW5kKSAtPlxuXG5cdFx0cmV0dXJuIGJhc2UgaWYgbm90IEBpc0JhcmVPYmplY3QodG9BcHBlbmQpIG9yIG5vdCBAaXNCYXJlT2JqZWN0KGJhc2UpXG5cblx0XHRmb3Igb3duIGtleSwgbmV3VmFsIG9mIHRvQXBwZW5kXG5cblx0XHRcdGNvbnRpbnVlIHVubGVzcyBuZXdWYWwgaXNudCB1bmRlZmluZWRcblxuXHRcdFx0aWYgdHlwZW9mIG5ld1ZhbCBpc250ICdvYmplY3QnIG9yIEBpc0luc3RhbmNlIG5ld1ZhbFxuXG5cdFx0XHRcdGJhc2Vba2V5XSA9IG5ld1ZhbFxuXG5cdFx0XHRlbHNlXG5cblx0XHRcdFx0IyBuZXdWYWwgaXMgYSBiYXJlIG9iamVjdFxuXG5cdFx0XHRcdG9sZFZhbCA9IGJhc2Vba2V5XVxuXG5cdFx0XHRcdGlmIHR5cGVvZiBvbGRWYWwgaXNudCAnb2JqZWN0JyBvciBAaXNJbnN0YW5jZSBvbGRWYWxcblxuXHRcdFx0XHRcdGJhc2Vba2V5XSA9IEBjbG9uZSBuZXdWYWxcblxuXHRcdFx0XHRlbHNlXG5cblx0XHRcdFx0XHRAYXBwZW5kT250byBvbGRWYWwsIG5ld1ZhbFxuXG5cdFx0YmFzZVxuXG5cdCMgR3JvdXBzXG5cdGdyb3VwUHJvcHM6IChvYmosIGdyb3VwcykgLT5cblxuXHRcdGdyb3VwZWQgPSB7fVxuXG5cdFx0Zm9yIG5hbWUsIGRlZnMgb2YgZ3JvdXBzXG5cblx0XHRcdGdyb3VwZWRbbmFtZV0gPSB7fVxuXG5cdFx0Z3JvdXBlZFsncmVzdCddID0ge31cblxuXHRcdGB0b3A6IC8vYFxuXHRcdGZvciBrZXksIHZhbCBvZiBvYmpcblxuXHRcdFx0c2hvdWxkQWRkID0gbm9cblxuXHRcdFx0Zm9yIG5hbWUsIGRlZnMgb2YgZ3JvdXBzXG5cblx0XHRcdFx0dW5sZXNzIEFycmF5LmlzQXJyYXkgZGVmc1xuXG5cdFx0XHRcdFx0ZGVmcyA9IFtkZWZzXVxuXG5cdFx0XHRcdGZvciBkZWYgaW4gZGVmc1xuXG5cdFx0XHRcdFx0aWYgdHlwZW9mIGRlZiBpcyAnc3RyaW5nJ1xuXG5cdFx0XHRcdFx0XHRpZiBrZXkgaXMgZGVmXG5cblx0XHRcdFx0XHRcdFx0c2hvdWxkQWRkID0geWVzXG5cblx0XHRcdFx0XHRlbHNlIGlmIGRlZiBpbnN0YW5jZW9mIFJlZ0V4cFxuXG5cdFx0XHRcdFx0XHRpZiBkZWYudGVzdCBrZXlcblxuXHRcdFx0XHRcdFx0XHRzaG91bGRBZGQgPSB5ZXNcblxuXHRcdFx0XHRcdGVsc2UgaWYgZGVmIGluc3RhbmNlb2YgRnVuY3Rpb25cblxuXHRcdFx0XHRcdFx0aWYgZGVmIGtleVxuXG5cdFx0XHRcdFx0XHRcdHNob3VsZEFkZCA9IHllc1xuXG5cdFx0XHRcdFx0ZWxzZVxuXG5cdFx0XHRcdFx0XHR0aHJvdyBFcnJvciAnR3JvdXAgZGVmaW5pdGlvbnMgbXVzdCBlaXRoZXJcblx0XHRcdFx0XHRcdGJlIHN0cmluZ3MsIHJlZ2V4ZXMsIG9yIGZ1bmN0aW9ucy4nXG5cblx0XHRcdFx0XHRpZiBzaG91bGRBZGRcblxuXHRcdFx0XHRcdFx0Z3JvdXBlZFtuYW1lXVtrZXldID0gdmFsXG5cblx0XHRcdFx0XHRcdGBjb250aW51ZSB0b3BgXG5cblx0XHRcdGdyb3VwZWRbJ3Jlc3QnXVtrZXldID0gdmFsXG5cblx0XHRncm91cGVkIiwibW9kdWxlLmV4cG9ydHMgPVxyXG5cclxuXHQjIHBhZHMgYSBudW1iZXIgd2l0aCBsZWFkaW5nIHplcm9lc1xyXG5cdCNcclxuXHQjIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzEwMDczNzg4LzYwNzk5N1xyXG5cdHBhZDogKG4sIHdpZHRoLCB6ID0gJzAnKSAtPlxyXG5cclxuXHRcdG4gPSBuICsgJydcclxuXHJcblx0XHRpZiBuLmxlbmd0aCA+PSB3aWR0aFxyXG5cclxuXHRcdFx0blxyXG5cclxuXHRcdGVsc2VcclxuXHJcblx0XHRcdG5ldyBBcnJheSh3aWR0aCAtIG4ubGVuZ3RoICsgMSkuam9pbih6KSArIG4iXX0=